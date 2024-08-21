import {useAlbumEdit} from "../../providers/AlbumProvider";
import {ChangeEvent, MouseEvent } from "react";
import { ReactComponent as PasswordIcon } from "../../assets/icons/password_icon.svg";
import './AlbumDataEditor.scss';

export const AlbumDataEditor = () => {
    const { albumData, setAlbumData } = useAlbumEdit();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbumData(prevData => {
            return {
                ...prevData,
                title: e.target.value,
            };
        });
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAlbumData(prevData => {
            return {
                ...prevData,
                description: e.target.value,
            };
        });
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbumData(prevData => {
            return {
                ...prevData,
                password: e.target.value,
            };
        });
    }

    const handlePasswordAccessibleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbumData(prevData => {
            return {
                ...prevData,
                password_accessible: e.target.checked,
            };
        });
    }

    const handlePasswordRandom = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAlbumData(prevData => {
            return {
                ...prevData,
                password: Math.random().toString(36).substring(2, 15),
            };
        });
    }


    return (
        <form className={"album-data-editor"}>
            <div className={"album-texts"}>
                <input
                    type="text" id={"album-title-input"}
                    name={"album-title"}
                    onChange={handleTitleChange}
                    value={albumData.title}
                    placeholder={"Sans titre"}
                />

                <label className={"album-description"}>
                    <span>Description:</span>
                    <textarea
                        name={"description"} id={"description"}
                        onChange={handleDescriptionChange}
                        placeholder={"No description"}
                        value={albumData.description}
                        onInput={(e) => {
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                        }}
                    />
                </label>
            </div>

            <div className={"password-edit"}>
                <label className={albumData.password_accessible ? "password-accessible" : ""}>
                    <input
                        type="checkbox"
                        checked={albumData.password_accessible}
                        onChange={handlePasswordAccessibleChange}
                    />
                    <span>Password accessible ?</span>
                </label>

                {albumData.password_accessible &&
                    <label className={'password-input'}>
                        <span>Password:</span>
                        <div>
                            <input
                                type="text"
                                value={albumData.password}
                                onChange={handlePasswordChange}
                            />

                            <button onClick={handlePasswordRandom}>
                                <PasswordIcon className={"password-icon"}/>
                            </button>
                        </div>
                    </label>
                }
            </div>
        </form>
    );
};