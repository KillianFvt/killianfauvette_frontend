import {ImageData} from "../types/ImageData";
import {CDN_TOKEN, CDN_URL} from "../App";

interface CDNWorkerResponse {
    key: string;
    message: string;
}

export const uploadCDNImage: (imageData : ImageData) => Promise<string> = async (imageData) => {
    if (!imageData.file) {
        throw new Error('No file to upload');
    }

    const fileName = `${imageData.name}.${imageData.extension}`;

    const response = await fetch(`${CDN_URL}/${fileName}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': `image/${imageData.extension}`,
            'Authorization': `Bearer ${CDN_TOKEN}`
        },
        body: imageData.file!,
    });

    if (!response.ok) {
        throw new Error('Error uploading image');
    } else {
        const data: CDNWorkerResponse = await response.json();
        return data.key;
    }
};