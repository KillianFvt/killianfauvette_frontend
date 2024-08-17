import './UploadImagesPage.scss';
import {AlbumImagesForm} from "../../components/image/AlbumImagesForm";
import {AlbumProvider} from "../../providers/AlbumProvider";

export const UploadImagesPage = () => {
    return (
        <AlbumProvider>
            <div className="upload-images-page">
                <h1>Upload images</h1>
                <AlbumImagesForm/>
            </div>
        </AlbumProvider>
    );
};