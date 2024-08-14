import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {NewImageData} from "../types/NewImageData";

export interface ImagesUploadContextType {
    files: NewImageData[];
    setFiles: Dispatch<SetStateAction<NewImageData[]>>;
    userIds: number[];
    setUserIds: Dispatch<SetStateAction<number[]>>;
    handleFiles: (files: FileList) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    updateFileName: (index: number, fileName: string) => void;
    updateAllFileNames: (fileName: string) => void;
    updateFileWatermark: (index: number, hasWatermark: boolean) => void;
    updateAllFileWatermarks: (hasWatermark: boolean) => void;
    deleteFile: (index: number) => void;
}

const ImagesUploadContext = createContext<ImagesUploadContextType>({
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

export const ImagesUploadProvider = ({ children }: { children: React.ReactNode }) => {
    const [files, setFiles] = useState<NewImageData[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);

    const handleFiles = (files: FileList) => {
        const newImages : NewImageData[] = Array.from(files).map(file => ({
            file: file,
            name: file.name.split('.').slice(0, -1).join('.'),
            extension: file.name.split('.').pop() || '',
            blobUrl: URL.createObjectURL(file),
            has_watermark: false,
            belongs_to: []
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
        setFiles((prevImages: NewImageData[]) => {
            const newImages: NewImageData[] = [...prevImages];

            if (fileName) {
                const totalFiles: number = newImages.length;
                const digits: number = totalFiles.toString().length;

                for (let i: number = 0; i < totalFiles; i++) {
                    const paddedIndex: string = (i + 1).toString().padStart(digits, '0');
                    newImages[i].name = `${fileName}-${paddedIndex}`;
                }
            } else {
                newImages.forEach((image: NewImageData) => {
                    return image.name = image.file.name.split('.').slice(0, -1).join('.');
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
        console.log('submit triggered');
        files.forEach(image => {
            console.info('Image:', image);
        });
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

    return <ImagesUploadContext.Provider value={value}>{children}</ImagesUploadContext.Provider>;
};

export const useImagesUpload = () => {
    return useContext(ImagesUploadContext);
}