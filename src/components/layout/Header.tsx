import './Header.css';
import {useUser} from "../../providers/UserProvider";
import {User} from "../../types/UserType";

export const Header = () => {

    const { user }: { user: User | null } = useUser();

    return (
        <header>
            <h2>Header</h2>
            <div className="user">
                {user ? (
                    <>
                        <span>{user.firstName}</span>
                        <span>{user.lastName}</span>
                        <span>{user.email}</span>
                    </>
                ) : (
                    <span>Not logged in</span>
                )}
            </div>
        </header>
    );
};