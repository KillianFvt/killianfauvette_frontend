import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {User} from "../types/UserType";
import {fetchUser} from "../methods/fetchUser";
import {refreshToken} from "../methods/refreshToken";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    reloadUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    reloadUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const storeUser = useCallback((usr : User) => {
        setUser(usr);
        localStorage.setItem('user', JSON.stringify(usr));
    }, []);


    const reloadUser = useCallback(async () => {
        setLoading(true);
        const storedUser: string | null = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            const fetchedUser: User | null = await fetchUser();
            if (fetchedUser) {
                storeUser(fetchedUser);
            } else {
                const success: boolean = await refreshToken();
                if (success) {
                    const refreshedUser: User | null = await fetchUser();
                    if (refreshedUser) {
                        storeUser(refreshedUser);
                    }
                } else {
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        }
    }, [storeUser]);

    useEffect(() => {
        reloadUser();
    }, [reloadUser]);

    const value = { user, setUser, loading, reloadUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
