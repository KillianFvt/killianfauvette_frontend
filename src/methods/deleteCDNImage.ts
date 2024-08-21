import {CDN_TOKEN, CDN_URL} from "../App";

export const deleteCDNImage: (url : string) => Promise<boolean> = async (url) => {

    const response = await fetch(`${CDN_URL}/${url}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${CDN_TOKEN}`
        },
    });

    if (!response.ok) {
        throw new Error('Error deleting image');
    } else {
        return true;
    }
};