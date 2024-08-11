import {useCallback, useEffect, useState} from "react";
import {CDN_TOKEN, CDN_URL} from "../../App";
import './CDNImage.scss';

interface CDNImageProps {
    url: string;
    name: string;
}

export const CDNImage = (cdnImageProps: CDNImageProps) => {
    const [image, setImage] = useState<Blob | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const cdnToken: string = CDN_TOKEN;

    const fetchCDNImage = useCallback(async () => {
        try {
            const response = await fetch(
                `${CDN_URL}/${cdnImageProps.url}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${cdnToken}`,
                    }
                }
            );

            if (response.ok) {
                const data = await response.blob();
                setImage(data);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            return false;
        }
    }, [cdnImageProps.url, cdnToken]);

    useEffect(() => {
        if (cdnToken) {
            fetchCDNImage().then((success: boolean) => setHasError(!success));
        }
    }, [cdnImageProps.url, cdnToken, fetchCDNImage]);

    if (hasError) {
        return <p>Cette image n'existe pas ou n'est pas accessible.</p>;
    }

    if (!image) {
        return <div className={'cdn-image-placeholder'}>
            <div className={"swiper"}/>
        </div>;
    }

    const displayImage: string = URL.createObjectURL(image);

    return <img className={'cdn-image'} alt={cdnImageProps.name} src={displayImage}/>;
};