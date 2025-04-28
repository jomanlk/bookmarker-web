import api from "./api";

const bookmarkService = {
  async getBookmarks(page = 1, limit = 50) {
    try {
      const response = await api.get("/bookmarks", {
        params: { page, limit },
      });
      return response.data.bookmarks;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw error;
    }
  },

  async createBookmark(bookmark) {
    const response = await api.post("/bookmarks", bookmark);
    return response.data;
  },

  async updateBookmark(bookmark) {
    const response = await api.patch(`/bookmarks/${bookmark.id}`, bookmark);
    return response.data;
  },

  async getBookmark(id) {
    const response = await api.get(`/bookmarks/${id}`);
    return response.data.bookmark;
  },

  async searchByTag(tag, page = 1, limit = 50) {
    const response = await api.get("/bookmarks/tag", {
      params: { tag, page, limit },
    });
    return response.data.bookmarks;
  },

  // Additional methods for updating and deleting bookmarks can be added here
};

export default bookmarkService;
