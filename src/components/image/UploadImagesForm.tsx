import {useContext} from "react";
import {useImagesUpload, ImagesUploadContextType} from "../../providers/ImagesUploadProvider";
import {UploadImage} from "./UploadImage";

export const UploadImagesForm = () => {
    const {
        files,
        handleFileChange,
        handleDrop,
        updateFileName,
        updateFileWatermark,
        handleSubmit
    }: ImagesUploadContextType = useImagesUpload();

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                onDrop={handleDrop}
                accept="image/*"
            />

            <div className={"images-preview"}>
                {
                    files.map((file, index) => (
                        <UploadImage key={index} index={index}/>
                    ))
                }
            </div>
        </form>
    );
};