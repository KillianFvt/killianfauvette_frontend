import '../../styles/layout/Header.css';
import {useUser} from "../../providers/UserProvider";

export const Header = () => {

    const { user} = useUser();

    return (
        <header>
            <h2>Header</h2>
            <div className="user">
                {user ? (
                    <>
                        <span>{user.username}</span>
                        <span>{user.email}</span>
                    </>
                ) : (
                    <span>Not logged in</span>
                )}
            </div>
        </header>
    );
};