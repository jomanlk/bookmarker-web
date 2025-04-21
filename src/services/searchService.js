import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

const searchService = {
  async search(query) {
    try {
      const response = await axios.get(
        `${API_HOST}/search?q=${encodeURIComponent(query)}`
      );
      return response.data.bookmarks;
    } catch (error) {
      console.error("Error searching bookmarks:", error);
      throw error;
    }
  },
};

export default searchService;
