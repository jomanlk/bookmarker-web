import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

const tagService = {
  async getTags() {
    try {
      const response = await axios.get(`${API_HOST}/tags`);
      return response.data.tags;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },
};

export default tagService;
