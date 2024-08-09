import React, {createContext, useState, useContext, useEffect, useCallback} from 'react';
import {User} from "../types/UserType";
import {fetchUser} from "../methods/fetchUser";
import {refreshToken} from "../methods/refreshToken";
import {useNavigate} from "react-router-dom";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const storeUser = useCallback((usr : User) => {
        setUser(usr);
        localStorage.setItem('user', JSON.stringify(usr));
    }, []);
    
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser: string | null = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            fetchUser().then((fetchedUser: User | null) => {
                if (fetchedUser) {
                    storeUser(fetchedUser);
                } else {
                    refreshToken().then((success) => {
                        if (success) {
                            fetchUser().then((refreshedUser: User | null) => {
                                if (refreshedUser) {
                                    storeUser(refreshedUser);
                                }
                                setLoading(false);
                            });
                        } else {
                            localStorage.removeItem('user');
                            setLoading(false);
                        }
                    });
                }
            });
        }
    }, [navigate, storeUser]);

    const value = { user, setUser, loading };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
