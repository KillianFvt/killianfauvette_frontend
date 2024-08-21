import './AlbumEditPage.scss';
import {AlbumImagesForm} from "../../components/album/AlbumImagesForm";
import {AlbumProvider} from "../../providers/AlbumProvider";

export const AlbumEditPage = () => {
    return (
        <AlbumProvider>
            <div className="upload-images-page">
                <AlbumImagesForm/>
            </div>
        </AlbumProvider>
    );
};