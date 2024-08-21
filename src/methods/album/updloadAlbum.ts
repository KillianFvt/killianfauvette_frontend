import {ImageData} from "../../types/ImageData";
import {uploadCDNImage} from "../uploadCDNImage";
import {deleteCDNImage} from "../deleteCDNImage";
import {Dispatch, SetStateAction} from "react";

interface uploadAlbumProps {
    images: ImageData[];
    setImages: Dispatch<SetStateAction<ImageData[]>>;
    setUploadProgress?: (progress: number) => void;
    checkTokenExpiration: () => boolean | null;
    reloadUser: () => Promise<void>;
}

export const updloadAlbum: (props: uploadAlbumProps) => Promise<boolean> = async (props) => {
    const {images, setImages, setUploadProgress, reloadUser, checkTokenExpiration} = props;

    let success: boolean = true;

    // Upload each image to the CDN
    const uploadedUrls: string[] = [];
    const deleteUploadedImages = async () => {
        for (const url of uploadedUrls) {
            try {
                await deleteCDNImage(url);
            } catch (error) {
                console.error(error);
            }
        }
        uploadedUrls.length = 0;
    }

    for (const image of images) {
        if (checkTokenExpiration()) {
            await reloadUser();
        }

        try {
            const url = await uploadCDNImage(image);
            uploadedUrls.push(url);
            image.url = url;
        } catch (error) {
            console.error(error);

            await deleteUploadedImages();

            success = false;
            break;
        }
    }

    if (!success) {
        return success;
    }

    // Update the album with the new image URLs
    setImages(images);

    // TODO - Create images in the database
    // TODO - Create and link album images in the database

    return success;
};