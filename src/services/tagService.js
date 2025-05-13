import api from "./api";

const tagService = {
  async getTags() {
    try {
      const response = await api.get("/tags");
      return response.data.tags;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },
};

export default tagService;
