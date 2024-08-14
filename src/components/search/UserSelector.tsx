import './UserSelector.scss';
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {User} from "../../types/UserType";
import {searchUsers} from "../../methods/searchUsers";

interface userSelectorProps {
    setUserIds: Dispatch<SetStateAction<number[]>>;
    userIds: number[];
}

export const UserSelector = ({ setUserIds, userIds }: userSelectorProps) => {
    const [query, setQuery] = useState<string>('');
    const [queriedUsers, setQueriedUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!query) return;
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
        setUserIds(prevIds => prevIds.filter(id => id !== user.id));
        setSelectedUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    }

    return (
        <div className={"user-selector"}>
            <form onSubmit={handleSearch} method={"get"}>
                <input type="text" onChange={handleQueryChange} value={query}/>
                <button type={"submit"} disabled={!(query.length > 0)}>Search</button> {/*TODO replace with search Icon*/}
            </form>

            <div className={'selected-users'}>
                <ul>
                    {selectedUsers.map(user =>
                        <li key={`selected-user-${user.id}`}>
                            <span>{user.email}</span>
                            <button onClick={() => handleUserRemove(user)}>×</button>
                        </li>
                    )}
                </ul>
            </div>

            <div className={'queried-user-list'}>
                <ul>
                    <li className={'queried-user-header'}>
                        <span className={'queried-user id'}>| id</span>
                        <span className={'queried-user username'}>| username</span>
                        <span className={'queried-user email'}>| email</span>
                        <span className={'queried-user first-name'}>| firstName</span>
                        <span className={'queried-user last-name'}>| lastName</span>
                    </li>

                    {queriedUsers.map(user =>
                        <li
                            className={'queried-user'}
                            key={`queried-user-${user.id}`}
                            onClick={() => handleUserClick(user)}
                        >
                            <span className={'queried-user id'}>{user.id}</span>
                            <span className={'queried-user username'}>{user.username}</span>
                            <span className={'queried-user email'}>{user.email}</span>
                            <span className={'queried-user first-name'}>{user.firstName}</span>
                            <span className={'queried-user last-name'}>{user.lastName}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
