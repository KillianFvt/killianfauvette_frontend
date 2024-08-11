import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchImage} from "../../methods/fetchImage";
import {ImageData} from "../../types/ImageData";
import {CDNImage} from "../../components/image/CDNImage";
import './ViewImagePage.scss';

export const ViewImagePage = () => {

    const params = useParams();
    const imageId = useRef<number>(
        parseInt(params.imageId ?? "-1")
    );
    const [imageData, setImageData]
        = useState<ImageData | null | undefined>(undefined);

    useEffect(() => {
        document.title = "View Image";
        if (imageId.current !== -1) {
            fetchImage(imageId.current).then(
                (data) => {
                    setImageData(data);
                }
            );
        }
    }, []);


    return (
        <div className={"view-image-page"}>

            {imageData &&
	            <p>{
                    `name : ${imageData?.name}, uploaded : ${imageData?.uploaded}, belongs_to : ${imageData.belongs_to}`
                }</p>
            }

            {imageData === undefined ? (
                <p>Chargement...</p>
            ) : imageData === null ? (
                <p>Un problème est survenu.</p>
            ) : (
                <div className={"image-container"}>
                    <CDNImage url={imageData.url} name={imageData.name}/>
                </div>
            )}
        </div>
    );
};