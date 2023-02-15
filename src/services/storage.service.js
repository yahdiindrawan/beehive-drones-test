const ACCESS_TOKEN = "access_token";
const ACCESS_REFRESH_TOKEN = "refresh_token";
const ME = "me";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const StorageService = {
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },

  saveToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  },

  getUser() {
    return JSON.parse(localStorage.getItem(ME));
  },

  saveUser(user) {
    localStorage.setItem(ME, JSON.stringify(user));
  },

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  },

  removeUser() {
    localStorage.removeItem(ME);
  },

  getRefreshToken() {
    return localStorage.getItem(ACCESS_REFRESH_TOKEN);
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(ACCESS_REFRESH_TOKEN, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(ACCESS_REFRESH_TOKEN);
  },
};

export { StorageService };
