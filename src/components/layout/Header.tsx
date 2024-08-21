import './Header.scss';
import {useUser} from "../../providers/UserProvider";
import {User} from "../../types/UserType";

interface HeaderProps {
    pageName?: string;
}

export const Header = ({ pageName } : HeaderProps) => {

    const { user }: { user: User | null} = useUser();

    return (
        <header>
            <h2>{pageName}</h2>
            <div className="user-infos">
                {user && <>
                    <span>{user.firstName} | </span>
                    <span>{user.lastName} | </span>
                    <span>{user.email} </span>
                </>
                }
            </div>
        </header>
    );
};