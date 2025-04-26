import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

const bookmarkService = {
  async getBookmarks(page = 1, limit = 50) {
    try {
      const response = await axios.get(`${API_HOST}/bookmarks`, {
        params: { page, limit },
      });
      return response.data.bookmarks;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw error;
    }
  },

  async createBookmark(bookmark) {
    const response = await axios.post(`${API_HOST}/bookmarks`, bookmark);
    return response.data;
  },

  async updateBookmark(bookmark) {
    const response = await axios.patch(
      `${API_HOST}/bookmarks/${bookmark.id}`,
      bookmark
    );
    return response.data;
  },

  async getBookmark(id) {
    const response = await axios.get(`${API_HOST}/bookmarks/${id}`);
    return response.data.bookmark;
  },

  async searchByTag(tag, page = 1, limit = 50) {
    const response = await axios.get(`${API_HOST}/bookmarks/tag`, {
      params: { tag, page, limit },
    });
    return response.data.bookmarks;
  },

  // Additional methods for updating and deleting bookmarks can be added here
};

export default bookmarkService;
