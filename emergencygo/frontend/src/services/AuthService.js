import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
  login(username, password) {
    return axios.post(API_URL + 'login/', { username, password });
  }

  register(username, email, password) {
    return axios.post(API_URL + 'register/', { username, email, password });
  }

  verifyIdentity(file) {
    const formData = new FormData();
    formData.append('document', file);
    return axios.post(API_URL + 'verify/', formData);
  }
}

export default new AuthService();