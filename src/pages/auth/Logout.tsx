import {API_URL} from "../../App";
import {Suspense, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Logout.scss'
import {useUser} from "../../providers/UserProvider";

export const Logout = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { reloadUser } = useUser();

    const handleLogout = useCallback(async () => {
            try {
                const response = await fetch(`${API_URL}/token/logout/`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                });

                if (!response.ok) {
                    setSuccess(false);
                } else {
                    localStorage.removeItem('user');
                    await reloadUser();
                    console.log(localStorage.getItem('user'))
                }

            } catch (error) {
                console.error('Logout error:', error);
            }

    }, [reloadUser]);
    
    // Trigger logout immediately on component mount
    useEffect(() => {
        handleLogout().then(() => {
            setSuccess(true);
            navigate('/');
        });
    }, [handleLogout, navigate]);

    return (
        <div className={"logout-page"}>
            <Suspense fallback={<p>Déconnexion...</p>}>
                {success ? <p>Vous allez être redirigé</p> : <p>Déconnexion...</p>}
            </Suspense>
        </div>
    );
};