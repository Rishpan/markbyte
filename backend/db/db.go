package db

import (
	"context"
	"time"
)

type User struct {
	Username       string  `json:"username" bson:"username"`
	Password       string  `json:"password" bson:"password"`
	Email          *string `json:"email" bson:"email"`
	Style          string  `json:"style,omitempty" bson:"style,omitempty"`
	ProfilePicture string  `json:"profile_picture,omitempty" bson:"profile_picture,omitempty"`
	Name           string  `json:"name,omitempty" bson:"name,omitempty"`
}

type UserDB interface {
	CreateUser(ctx context.Context, user *User) (string, error)
	GetUser(ctx context.Context, username string) (*User, error)
	RemoveUser(ctx context.Context, username string) error
	GetUserStyle(ctx context.Context, username string) (string, error)
	UpdateUserStyle(ctx context.Context, username string, style string) error
	UpdateUserProfilePicture(ctx context.Context, username string, profilePicture string) error
	UpdateUserName(ctx context.Context, username string, name string) error
}

type BlogPostData struct {
	User         string    `json:"user" bson:"user"`
	Title        string    `json:"title" bson:"title"`
	DateUploaded time.Time `json:"date_uploaded" bson:"date_uploaded"`
	Version      string    `json:"version" bson:"version"`
	Link         *string   `json:"link,omitempty" bson:"link,omitempty"`
	IsActive     bool      `json:"is_active" bson:"is_active"`
	DirectLink   *string   `json:"direct_link,omitempty" bson:"direct_link,omitempty"`
}

type BlogPostVersionsData struct {
	User          string         `json:"user" bson:"user"`
	Title         string         `json:"title" bson:"title"`
	Versions      []BlogPostData `json:"versions" bson:"versions"`
	LatestVersion string         `json:"latest_version" bson:"latest_version"`
	ActiveVersion string         `json:"active_version" bson:"active_version"`
}

type BlogPostDataDB interface {
	CreateBlogPost(ctx context.Context, post *BlogPostData) (string, error)
	DeleteBlogPost(ctx context.Context, username string, title string) (int, error)
	UpdateActiveStatus(ctx context.Context, username string, title string, version string, isActive bool) error
	FetchAllUserBlogPosts(ctx context.Context, username string) ([]BlogPostVersionsData, error)
	FetchAllPostVersions(ctx context.Context, username string, title string) (BlogPostVersionsData, error)
	FetchAllActiveBlogPosts(ctx context.Context, username string) ([]BlogPostData, error)
	FetchActiveBlog(ctx context.Context, username string, title string) (string, error)
	FetchFiftyNewestPosts(ctx context.Context) ([]BlogPostData, error)
	IsPostActive(ctx context.Context, username string, title string, version string) (bool, error)
	FetchBlogPost(ctx context.Context, username string, title string, version string) (BlogPostData, error)
}

type PostAnalytics struct {
	Username  string      `json:"username" bson:"username"`
	Title     string      `json:"title" bson:"title"`
	Version   string      `json:"version" bson:"version"`
	Date      time.Time   `json:"date" bson:"date"`
	Views     []time.Time `json:"views" bson:"views"`
	Likes     []string    `json:"likes" bson:"likes"`
	ViewCount int         `json:"view_count" bson:"view_count"`
}

type AnalyticsDB interface {
	CreatePostAnalytics(ctx context.Context, post *PostAnalytics) (string, error)
	GetPostAnalytics(ctx context.Context, username string, title string, version string) (PostAnalytics, error)
	IncrementViews(ctx context.Context, username string, title string, version string) error
	ToggleLike(ctx context.Context, postUsername string, title string, version string, likingUsername string) (bool, error)
	DeletePostAnalytics(ctx context.Context, username string, title string) (int, error)
	GetAllPostTimeStamps(ctx context.Context, username string, active_posts []BlogPostData) ([]time.Time, error)
	GetPostViewCount(ctx context.Context, username string, title string, version string) (int, error)
	GetMostViewedPosts(ctx context.Context, limit int) ([]PostAnalytics, error)
}
