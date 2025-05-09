package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/shrijan-swaminathan/markbyte/backend/auth"
	"github.com/shrijan-swaminathan/markbyte/backend/db"
	"github.com/shrijan-swaminathan/markbyte/backend/db/redisdb"
)

var blogPostDataDB db.BlogPostDataDB

func SetBlogPostDataDB(repo db.BlogPostDataDB) {
	blogPostDataDB = repo
}

func HandleFetchAllBlogPosts(w http.ResponseWriter, r *http.Request) {
	username, ok := r.Context().Value(auth.UsernameKey).(string)
	if !ok || username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	blogs, err := blogPostDataDB.FetchAllUserBlogPosts(r.Context(), username)
	if err != nil {
		http.Error(w, "Failed to fetch blog posts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(blogs)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

// struct for publish post version that contains a username title and version
type PublishPostVersion struct {
	Username string `json:"username"`
	Title    string `json:"title"`
	Version  string `json:"version"`
}

func HandlePublishPostVersion(w http.ResponseWriter, r *http.Request) {
	username, ok := r.Context().Value(auth.UsernameKey).(string)
	if !ok || username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var postVersionReq PublishPostVersion
	err := json.NewDecoder(r.Body).Decode(&postVersionReq)
	if err != nil {
		http.Error(w, "Failed to decode request", http.StatusBadRequest)
		return
	}

	if postVersionReq.Username != username {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var postVersions db.BlogPostVersionsData
	postVersions, err = blogPostDataDB.FetchAllPostVersions(r.Context(), postVersionReq.Username, postVersionReq.Title)
	if err != nil {
		http.Error(w, "Failed to fetch post versions", http.StatusInternalServerError)
		return
	}

	for _, post := range postVersions.Versions {
		if post.IsActive {
			err = blogPostDataDB.UpdateActiveStatus(r.Context(), postVersionReq.Username, postVersionReq.Title, post.Version, false)
			if err != nil {
				http.Error(w, "Failed to update active status", http.StatusInternalServerError)
				return
			}
		}
	}

	err = blogPostDataDB.UpdateActiveStatus(r.Context(), postVersionReq.Username, postVersionReq.Title, postVersionReq.Version, true)
	if err != nil {
		http.Error(w, "Failed to update active status", http.StatusInternalServerError)
		return
	}

	if redisdb.RedisActive {
		endpoint := "/" + postVersionReq.Username + "/" + postVersionReq.Title
		err = redisdb.DeleteEndpoint(r.Context(), endpoint)
		if err != nil {
			fmt.Printf("Error removing old endpoint from redis")
		}
	}

	w.WriteHeader(http.StatusOK)
}

func HandleFetchUserActivePosts(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("user")
	if username == "" {
		http.Error(w, "No user provided", http.StatusBadRequest)
		return
	}

	blogs, err := blogPostDataDB.FetchAllActiveBlogPosts(r.Context(), username)
	if err != nil {
		http.Error(w, "Failed to fetch active posts", http.StatusInternalServerError)
		return
	}

	resp, err := json.Marshal(blogs)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(resp)
	if err != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}

}
