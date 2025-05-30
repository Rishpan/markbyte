/* This hook is used to fetch the user's about information from the server. Primarily used to see if the user has a bio or not. */
import { useState, useEffect, useCallback } from "react";
import { getUserAbout } from "@/services/userService";

function useUserAbout(username) {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  const fetchAbout = useCallback(() => {
    if (!username) return;
    getUserAbout(username)
      .then((res) => {
        setAbout(res.data || null);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch user about.");
        setAbout(null);
      });
  }, [username]);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return { about, error, fetchAbout };
}

export default useUserAbout;
