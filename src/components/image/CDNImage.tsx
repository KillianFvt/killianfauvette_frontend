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

    return (
        <div className={"CDNImage"}>
            <img alt={""} src={URL.createObjectURL(image)}/>
        </div>
    );
};