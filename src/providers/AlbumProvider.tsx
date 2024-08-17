import React, {ChangeEvent, createContext, useContext, useState} from "react";
import {ImageData} from "../types/ImageData";
import {AlbumContextType} from "../types/AlbumContextType";

const AlbumContext = createContext<AlbumContextType>({
    files: [],
    setFiles: () => {},
    userIds: [],
    setUserIds: () => {},
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
    const [files, setFiles] = useState<ImageData[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        files.forEach(image => {
            console.info('Image:', image);
        });
        console.log('User IDs:', userIds);
    }

    const deleteFile = (index: number) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    }

    const value = {
        files,
        setFiles,
        userIds,
        setUserIds,
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

export const useImagesUpload = () => {
    return useContext(AlbumContext);
}