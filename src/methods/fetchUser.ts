import {API_URL} from "../App";
import {User} from "../types/UserType";

export const fetchUser = async () : Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/users/current/`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            return {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
                isLoggedIn: true,
            };
        } else {
            // TODO try refresh token
            console.error('fetchUser error:', await response.json());
            return null;
        }
    } catch (error) {
        console.error('fetchUser error:', error);
        return null;
    }
}