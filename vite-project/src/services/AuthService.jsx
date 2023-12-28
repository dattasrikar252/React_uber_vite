import axios from 'axios';

class AuthService {
  async login(email, password) {
    try {
      // Make a POST request to your server for authentication
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      return { token: response.data.token, collectionName: response.data.collectionName };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }
}

export default AuthService;