import axios from "axios";

export const fetchManufacturerDetails = async (manufacturerId: number) => {
    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${manufacturerId}?format=json`
      );        
      return response.data.Results;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  
