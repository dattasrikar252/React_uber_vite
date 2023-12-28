import axios from "axios";

class UserService {
  async sendUserData(userInfo) {
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
      formData.append("userData", JSON.stringify(userInfo));
      const response = await axios.post("http://localhost:3001/api/sendUserData", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },});
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error("Registration failed. Please try again later.");
    }
  }
}

export default UserService;