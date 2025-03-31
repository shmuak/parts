import axios from "axios";
import { ListItem } from "../types/types";

export const getAllTypes = async (): Promise<string[]> => {
  try {
      const response = await axios.get<{ Results: ListItem[] }>(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetParts?format=json`
      );
      
      const types = new Set<string>();
      response.data.Results.forEach(item => {
          if (item.Type) {
              types.add(item.Type);
          }
      });
      
      return Array.from(types).sort();
  } catch (error) {
      console.error("Error getting types", error);
      throw error;
  }
};