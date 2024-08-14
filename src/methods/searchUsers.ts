import {API_URL} from "../App";
import {User} from "../types/UserType";

export const searchUsers: (query: string) => Promise<User[]> = async (query: string) => {

    const queriedUsers: User[] = [];

    try {
        const response = await fetch( `${API_URL}/users/search/?query=${query}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            for (const user of data) {
                queriedUsers.push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    lastName: user.last_name,
                    firstName: user.first_name,
                });
            }

            return queriedUsers;
        } else {
            console.error(response);
            return queriedUsers;
        }
    } catch (e) {
        console.error(e);
        return queriedUsers;
    }
}