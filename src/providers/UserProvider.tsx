import React, { createContext, useState, useContext, useEffect } from 'react';
import {User} from "../types/UserType";
import {fetchUser} from "../methods/fetchUser";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Simulating fetching user data from local storage or API
    useEffect(() => {
        const storedUser: string | null = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            fetchUser().then((user: User | null) => {
                setUser(user!);
            });
        }
    }, []);

    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
