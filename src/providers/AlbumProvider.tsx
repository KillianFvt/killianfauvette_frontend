import React, {ChangeEvent, createContext, MouseEvent, useContext, useState} from "react";
import {ImageData} from "../types/ImageData";
import {AlbumContextType} from "../types/AlbumContextType";
import {AlbumData} from "../types/AlbumData";
import {useUser} from "./UserProvider";
import {updloadAlbum} from "../methods/album/updloadAlbum";

const AlbumContext = createContext<AlbumContextType>({
    files: [],
    setFiles: () => {},
    userIds: [],
    setUserIds: () => {},
    albumData: {} as AlbumData,
    setAlbumData: () => {},
    handleFiles: () => {},
    handleDrop: () => {},
    handleFileChange: () => {},
    updateFileName: () => {},
    updateAllFileNames: () => {},
    updateFileWatermark: () => {},
    updateAllFileWatermarks: () => {},
    handleSubmit: () => {},
    deleteFile: () => {},
});

export const AlbumProvider = ({ children }: { children: React.ReactNode }) => {
    const { checkTokenExpiration, reloadUser } = useUser();
    const [files, setFiles] = useState<ImageData[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [albumData, setAlbumData] = useState<AlbumData>({
        title: 'Album sans titre',
        description: '',
        password: '',
        password_accessible: false,
    } as AlbumData);

    const handleFiles = (files: FileList) => {
        const newImages : ImageData[] = Array.from(files).map(file => ({
            file: file,
            name: file.name.split('.').slice(0, -1).join('.'),
            extension: file.name.split('.').pop() || '',
            blobUrl: URL.createObjectURL(file),
            has_watermark: false,
            belongs_to: [],
            url: ''
        }));
        setFiles(prevImages => [...prevImages, ...newImages]);
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFiles(event.target.files);
        }
    };

    const updateFileName = (index: number, fileName: string) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages[index].name = fileName;
            return newImages;
        });
    };

    const updateAllFileNames = (fileName: string) => {
        setFiles((prevImages: ImageData[]) => {
            const newImages: ImageData[] = [...prevImages];

            if (fileName) {
                const totalFiles: number = newImages.length;
                const digits: number = totalFiles.toString().length;

                for (let i: number = 0; i < totalFiles; i++) {
                    const paddedIndex: string = (i + 1).toString().padStart(digits, '0');
                    newImages[i].name = `${fileName}-${paddedIndex}`;
                }
            } else {
                newImages.forEach((image: ImageData) => {
                    return image.name = image.file!.name.split('.').slice(0, -1).join('.');
                });
            }

            return newImages;
        });
    };

    const updateFileWatermark = (index: number, hasWatermark: boolean) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages[index].has_watermark = hasWatermark;
            return newImages;
        });
    };

    const updateAllFileWatermarks = (hasWatermark: boolean) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages.forEach(image => image.has_watermark = hasWatermark);
            return newImages;
        });
    };

    const deleteFile = (index: number) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await updloadAlbum({
            images: files,
            setImages: setFiles,
            checkTokenExpiration: checkTokenExpiration,
            reloadUser: reloadUser,
        });
    }

    const value = {
        files,
        setFiles,
        userIds,
        setUserIds,
        albumData,
        setAlbumData,
        handleFiles,
        handleDrop,
        handleFileChange,
        updateFileName,
        updateAllFileNames,
        updateFileWatermark,
        updateAllFileWatermarks,
        handleSubmit,
        deleteFile,
    };

    return <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>;
};

export const useAlbumEdit = () => {
    return useContext(AlbumContext);
}