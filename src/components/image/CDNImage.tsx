import {useEffect, useState} from "react";
import {BEARER_TOKEN} from "../../App";

interface CDNImageProps {
    url: string;
    name: string;
}

export const CDNImage = (imageProps: CDNImageProps) => {
    const [image, setImage] = useState<Blob | null>(null);
    const token = BEARER_TOKEN;

    useEffect(() => {
        if (token) {
            const fetchImage = async () => {
                try {
                    const response = await fetch(
                        imageProps.url,
                        {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                // 'Authorization': `Bearer ${token}`
                                'Authorization': 'Bearer 17?-kilFAU',
                            }
                        }
                    );
                    if (response.ok) {
                        const data = await response.blob();
                        setImage(data);
                    } else {
                        console.error("Failed to fetch image");
                    }
                } catch (error) {
                    console.error("Error fetching image:", error);
                }
            };

            fetchImage();
        }
    }, [imageProps.url, token]);

    if (!image) {
        return <div>Loading...</div>;
    }

    const displayImage = URL.createObjectURL(image);

    return (
        <div className={"CDNImage"}>
            <a download={imageProps.name} href={displayImage}>
                <img alt={""} src={displayImage}/>
            </a>
            <p>{imageProps.name}</p>
        </div>
    );
};