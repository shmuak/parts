import axios from "axios";
import { ListItem } from "../types/types";

export const dataFetch = async (
    name?: string, 
    type?: string,
    page: number = 1,
    itemsPerPage: number = 10
): Promise<{ results: ListItem[]; totalCount: number }> => {
    try {
        const response = await axios.get<{ Results: ListItem[] }>(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetParts?format=json`
        );
        
        let filteredResults = response.data.Results;
        
        if (name) {
            const searchTerm = name.toLowerCase();
            filteredResults = filteredResults.filter(item => 
                item.Name.toLowerCase().includes(searchTerm)
            );
        }
        
        if (type) {
            filteredResults = filteredResults.filter(item => 
                item.Type === type
            );
        }
        
        // Пагинация
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);
        
        return {
            results: paginatedResults,
            totalCount: filteredResults.length
        };
    } catch (error) {
        console.error("Error getting data", error);
        throw error;
    }
};

