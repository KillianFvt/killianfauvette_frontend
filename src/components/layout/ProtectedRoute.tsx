import {useLocation, useNavigate} from 'react-router-dom';
import {PropsWithChildren, useEffect} from "react";
import {useUser} from "../../providers/UserProvider";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user) {
            navigate(`/login?redirect=${location.pathname}`);
        }
    }, [user, loading, navigate, location.pathname]);

    return <>{user && children}</>;
};

export default ProtectedRoute;