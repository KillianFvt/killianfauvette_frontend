import './UploadImagesPage.scss';
import {UploadImagesForm} from "../../components/image/UploadImagesForm";
import {ImagesUploadProvider} from "../../providers/ImagesUploadProvider";

export const UploadImagesPage = () => {
    return (
        <ImagesUploadProvider>
            <div className="upload-images-page">
                <h2>Upload images</h2>
                <UploadImagesForm/>
            </div>
        </ImagesUploadProvider>
    );
};