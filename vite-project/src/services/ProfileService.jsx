import axios from 'axios';

class ProfileService {
    constructor() {
      this.baseURL = 'http://localhost:3001/api'; // Replace with your actual backend API URL
    }
  
    async getUserProfile(token) {
        try {
          const response = await axios.get(`${this.baseURL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          return response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          throw error;
        }
      }
      async updateUserData(userInfo) {
        console.log(userInfo)
        try {
          const formData = new FormData();
      
          for (const key in userInfo) {
            if (userInfo[key] !== undefined) {
              if (userInfo[key] instanceof File) {
                formData.append(key, userInfo[key]);
              } else {
                formData.append(key, JSON.stringify(userInfo[key]));
              }
            }
          }
      
          const response = await axios.post("http://localhost:3001/api/updateUserData", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          return response.data;
        } catch (error) {
          console.error('Update error:', error);
          throw new Error("Update failed. Please try again later.");
        }
      }
    }
export default ProfileService;