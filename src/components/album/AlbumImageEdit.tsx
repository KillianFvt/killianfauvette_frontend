import {useAlbumEdit} from "../../providers/AlbumProvider";
import {ChangeEvent} from "react";
import {ReactComponent as DeleteIcon} from "../../assets/icons/delete_icon.svg";
import './AlbumImageEdit.scss';
import {AlbumContextType} from "../../types/AlbumContextType";

interface AlbumImageEditProps {
    index: number;
}

export const AlbumImageEdit = ({ index } : AlbumImageEditProps) => {
    const {
        files,
        updateFileName,
        updateFileWatermark,
        deleteFile,
    }: AlbumContextType = useAlbumEdit();

    const handleFileNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newFileName: string = e.target.value.replaceAll('\n', '');
        newFileName = newFileName.replaceAll('\r', '');
        newFileName = newFileName.replaceAll(' ', '_');
        updateFileName(index, newFileName);
        e.target.value = newFileName;
    }

    const handleFileWatermarkChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFileWatermark(index, e.target.checked);
    }

    const handleDeleteFile = (index: number) => () => {
        deleteFile(index);
    }

    return (
        <div className={"album-image-edit"}>
            <button className={"delete-img-btn"} onClick={handleDeleteFile(index)}>
                <DeleteIcon className={"delete-icon"}/>
            </button>

            <div className={'image-preview'}>
                <img src={files[index].blobUrl} alt={files[0].name}/>
            </div>

            <div className={"album-image-edit-inputs"}>
                <textarea
                    className={"file-name-input"}
                    value={files[index].name}
                    onChange={handleFileNameChange}
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                    }}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={files[index].has_watermark}
                        onChange={handleFileWatermarkChange}
                    />
                    Has Watermark
                </label>
            </div>
        </div>
    );
};