// RiderService.js
import axios from "axios";

class RiderService {
  async sendRiderData(riderData) {
    try {
      const formData = new FormData();

      for (const key in riderData) {
        if (riderData[key] !== undefined) {
          if (riderData[key] instanceof File) {
            formData.append(key, riderData[key]);
          } else {
            formData.append(key, JSON.stringify(riderData[key]));
          }
        }
      }
      formData.append("userData", JSON.stringify(riderData));

      const response = await axios.post("http://localhost:3001/api/sendRiderData", formData);
      return response.data;
    } catch (error) {
      console.error('Rider registration error:', error);
      throw new Error("Rider registration failed. Please try again later.");
    }
  }
}

export default RiderService;
