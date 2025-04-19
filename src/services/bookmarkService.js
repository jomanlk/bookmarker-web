import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

const bookmarkService = {
  async getBookmarks() {
    // add in error handling
    try {
      const response = await axios.get(`${API_HOST}/bookmarks`);
      return response.data.bookmarks;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw error; // rethrow the error for further handling if needed
    }
  },

  async createBookmark(bookmark) {
    const response = await axios.post(`${API_HOST}/bookmarks`, bookmark);
    return response.data;
  },

  async updateBookmark(bookmark) {
    const response = await axios.put(
      `${API_HOST}/bookmarks/${bookmark.id}`,
      bookmark
    );
    return response.data;
  },

  async getBookmark(id) {
    const response = await axios.get(`${API_HOST}/bookmarks/${id}`);
    return response.data.bookmark;
  },
  // Additional methods for updating and deleting bookmarks can be added here
};

export default bookmarkService;
