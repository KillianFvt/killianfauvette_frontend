import {API_URL} from "../App";

export const refreshToken = async () : Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/token/refresh/`, {
            method: 'POST',
            credentials: 'include',
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};