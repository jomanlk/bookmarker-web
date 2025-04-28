import api from "./api";

const searchService = {
  async search(query) {
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data.bookmarks;
    } catch (error) {
      console.error("Error searching bookmarks:", error);
      throw error;
    }
  },
};

export default searchService;
