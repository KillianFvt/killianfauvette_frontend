import {useImagesUpload} from "../../providers/ImagesUploadProvider";

export const UploadImage = () => {

    const {
        files,
        updateFileName,
        updateFileWatermark
    } = useImagesUpload();

    return (
        <div className={"upload-image"}>
        </div>
    );
};