import {ImagesUploadContextType, useImagesUpload} from "../../providers/ImagesUploadProvider";
import {ChangeEvent} from "react";

interface UploadImageProps {
    index: number;
}

export const UploadImage = ({ index } : UploadImageProps) => {
    const {
        files,
        updateFileName,
        updateFileWatermark,
        deleteFile,
    }: ImagesUploadContextType = useImagesUpload();

    const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFileName(index, e.target.value);
    }

    const handleFileWatermarkChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFileWatermark(index, e.target.checked);
    }

    const handleDeleteFile = (index: number) => () => {
        deleteFile(index);
    }

    return (
        <div className={"upload-image"}>
            <img className={'image-preview'} src={files[index].blobUrl} alt={files[0].name}/>
            <input
                type="text" value={files[index].name}
                onChange={handleFileNameChange}
            />

            <label>
                <input
                    type="checkbox"
                    checked={files[index].has_watermark}
                    onChange={handleFileWatermarkChange}
                />
                Has Watermark
            </label>
            <button onClick={handleDeleteFile(index)}>Delete</button>
        </div>
    );
};