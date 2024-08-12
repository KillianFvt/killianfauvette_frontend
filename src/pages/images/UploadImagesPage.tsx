import './UploadImagesPage.scss';
import {UploadImagesForm} from "../../components/image/UploadImagesForm";
import {ImagesUploadProvider} from "../../providers/ImagesUploadProvider";

export const UploadImagesPage = () => {
    return (
        <ImagesUploadProvider>
            <div className="upload-images-page">
                <h1>Upload images</h1>
                <UploadImagesForm/>
            </div>
        </ImagesUploadProvider>
    );
};