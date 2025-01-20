// utils/auth.js
const auth = {
    // Store token in localStorage
    storeToken(token) {
        localStorage.setItem('token', token);
    },

    // Get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Get user ID from token
    getUserId() {
        const token = this.getToken();
        if (!token) return null;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id_user; 
        } catch {
            return null;
        }
    },

    // Clear token (for logout)
    removeToken() {
        localStorage.removeItem('token');
    }
};

export default auth