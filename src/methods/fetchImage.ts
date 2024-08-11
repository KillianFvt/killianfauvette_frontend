import {API_URL} from "../App";
import {ImageData} from "../types/ImageData";

export const fetchImage = async (imageId: number) : Promise<ImageData | null> => {
    try {
        const response = await fetch(
            `${API_URL}/images/${imageId}/`,
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            }
        );

        if (response.ok) {
            const data = await response.json();
            return {
                id: data.id,
                name: data.name,
                url: data.url,
                uploaded: new Date(data.uploaded),
                has_watermark: data.has_watermark,
                belongs_to: data.belongs_to,
            };
        } else {
            console.error("Failed to fetch image");
            return null;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};