import {useContext} from "react";
import {useImagesUpload, ImagesUploadContextType} from "../../providers/ImagesUploadProvider";

export const UploadImagesForm = () => {
    const {
        files,
        handleFileChange,
        updateFileName,
        updateFileWatermark,
        handleSubmit
    }: ImagesUploadContextType = useImagesUpload();

    return (
        <form onSubmit={handleSubmit}>

        </form>
    );
};