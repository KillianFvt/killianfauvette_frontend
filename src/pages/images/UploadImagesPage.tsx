import './UploadImagesPage.scss';
import {AlbumImagesForm} from "../../components/image/AlbumImagesForm";
import {AlbumProvider} from "../../providers/AlbumProvider";

export const UploadImagesPage = () => {
    return (
        <AlbumProvider>
            <div className="upload-images-page">
                <AlbumImagesForm/>
            </div>
        </AlbumProvider>
    );
};