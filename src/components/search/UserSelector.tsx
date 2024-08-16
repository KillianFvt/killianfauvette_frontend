import './UserSelector.scss';
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {User} from "../../types/UserType";
import {searchUsers} from "../../methods/searchUsers";
import {useUser} from "../../providers/UserProvider";
import { ReactComponent as SearchIcon} from "../../assets/icons/search_icon.svg";
import { ReactComponent as CloseIcon} from "../../assets/icons/close_icon.svg";

interface userSelectorProps {
    setUserIds: Dispatch<SetStateAction<number[]>>;
    userIds: number[];
}

export const UserSelector = ({ setUserIds, userIds }: userSelectorProps) => {
    const [query, setQuery] = useState<string>('');
    const [queriedUsers, setQueriedUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const { checkTokenExpiration, reloadUser } = useUser();

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!query) return;

        if (checkTokenExpiration()) {
            console.log('Token expired, refreshing');
            await reloadUser();
        }

        let users = await searchUsers(query);
        users = users.filter(user => !userIds.includes(user.id));
        setQueriedUsers(users);
    }

    const handleUserClick = (user: User) => {
        setUserIds(prevIds => [...prevIds, user.id]);
        setSelectedUsers(prevUsers => [...prevUsers, user]);
        setQueriedUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    }

    const handleUserRemove = (user: User) => {
        setQueriedUsers(prevUsers => [...prevUsers, user]);
        setUserIds(prevIds => prevIds.filter(id => id !== user.id));
        setSelectedUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    }

    return (
        <div className={"user-selector"}>
            <form onSubmit={handleSearch} method={"get"}>
                <input type="text" onChange={handleQueryChange} value={query} placeholder={"Search for users"}/>
                <button type={"submit"} disabled={!(query.length > 0)}>
                    <SearchIcon className={'search-icon'}/>
                </button>
            </form>

            <div className={'selected-users'}>
                <ul>
                    {selectedUsers.map(user =>
                        <li key={`selected-user-${user.id}`}>
                            <span className={'selected-user-email'}>{user.email}</span>
                            <button onClick={() => handleUserRemove(user)}>
                                <CloseIcon className={'close-icon'}/>
                            </button>
                            <span className={'selected-user-tooltip'}>
                                {user.firstName} {user.lastName}
                            </span>
                        </li>
                    )}
                </ul>
            </div>

            <div className={"queried-user-list-container"}>
                <table className={'queried-user-list'}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>firstName</th>
                        <th>lastName</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queriedUsers.map(user =>
                        <tr key={`queried-user-${user.id}`} onClick={() => handleUserClick(user)}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
