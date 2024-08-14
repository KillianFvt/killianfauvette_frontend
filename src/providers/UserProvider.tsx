import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {User} from "../types/UserType";
import {fetchUser} from "../methods/fetchUser";
import {refreshToken} from "../methods/refreshToken";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    reloadUser: () => Promise<void>;
    checkTokenExpiration: () => boolean | null;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    reloadUser: async () => {},
    checkTokenExpiration: () => null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const storeUser = useCallback((usr : User) => {
        setUser(usr);
        localStorage.setItem('user', JSON.stringify(usr));
    }, []);

    /**
     * Store the token expiration in the local storage
     * expiration is set to 1 hour from now
     */
    const storeTokenExpiration = useCallback(() => {
        let expirationDate: Date = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        localStorage.setItem('token_expiration',  expirationDate.toString());
    }, []);

    /**
     * Check if the token has expired
     * use it when doing a protected request that does not refresh the page
     * if the token has expired, call reloadUser()
     * @returns boolean | null
     */
    const checkTokenExpiration = useCallback(() => {
        const storedTokenExpiration: string | null = localStorage.getItem('token_expiration');
        if (storedTokenExpiration) {
            const expirationDate: number = new Date(storedTokenExpiration).getTime();
            const currentDate: number = Date.now();
            return currentDate > expirationDate;
        } else {
            return null;
        }
    }, []);


    const reloadUser = useCallback(async () => {
        setLoading(true);
        const storedUser: string | null = localStorage.getItem('user');
        const isTokenExpired: boolean | null = checkTokenExpiration();

        if (storedUser && !isTokenExpired) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            const fetchedUser: User | null = await fetchUser();
            if (fetchedUser) {
                storeUser(fetchedUser);
                storeTokenExpiration();
            } else {
                const success: boolean = await refreshToken();
                if (success) {
                    const refreshedUser: User | null = await fetchUser();
                    if (refreshedUser) {
                        storeUser(refreshedUser);
                        storeTokenExpiration();
                    }
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token_expiration');
                    setUser(null);
                }
            }
        }
    }, [checkTokenExpiration, storeTokenExpiration, storeUser]);

    useEffect(() => {
        reloadUser().then(() => setLoading(false));
    }, [reloadUser]);

    const value = { user, setUser, loading, reloadUser, checkTokenExpiration };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
