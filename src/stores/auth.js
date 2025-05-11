import { defineStore } from "pinia";
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async checkAuth() {
      this.loading = true;
      this.error = null;
      try {
        await this.fetchUser();
      } catch (e) {
        if (e.response && e.response.status === 401) {
          try {
            await this.refresh();
            await this.fetchUser();
          } catch {
            this.isAuthenticated = false;
            this.user = null;
          }
        } else {
          this.isAuthenticated = false;
          this.user = null;
        }
      }
      this.loading = false;
    },
    async fetchUser() {
      const response = await axios.get(`${API_HOST}/me`, {
        withCredentials: true,
      });
      this.isAuthenticated = true;
      this.user = response.data.user;
    },
    async login(username, password) {
      this.loading = true;
      this.error = null;
      try {
        await axios.post(
          `${API_HOST}/login`,
          { username, password },
          { withCredentials: true }
        );
        // The backend sets the cookie; no token handling needed here
        await this.checkAuth(); // Refresh user data after login
      } catch (e) {
        this.error = "Login failed";
      }
      this.loading = false;
    },
    async logout() {
      this.loading = true;
      try {
        await axios.post(`${API_HOST}/logout`, {}, { withCredentials: true });
      } catch (e) {
        // Ignore errors
      }
      this.isAuthenticated = false;
      this.user = null;
      this.loading = false;
    },
    async refresh() {
      try {
        await axios.post(`${API_HOST}/refresh`, {}, { withCredentials: true });
      } catch (e) {
        // Ignore errors
      }
    },
  },
});
