import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {NewImageData} from "../types/NewImageData";

export interface ImagesUploadContextType {
    files: NewImageData[];
    setFiles: Dispatch<SetStateAction<NewImageData[]>>;
    handleFiles: (files: FileList) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    updateFileName: (index: number, fileName: string) => void;
    updateFileWatermark: (index: number, hasWatermark: boolean) => void;
}

const ImagesUploadContext = createContext<ImagesUploadContextType>({
    files: [],
    setFiles: () => {},
    handleFiles: () => {},
    handleDrop: () => {},
    handleFileChange: () => {},
    updateFileName: () => {},
    updateFileWatermark: () => {},
    handleSubmit: () => {},
});

export const ImagesUploadProvider = ({ children }: { children: React.ReactNode }) => {
    const [files, setFiles] = useState<NewImageData[]>([]);

    const handleFiles = (files: FileList) => {
        const newImages : NewImageData[] = Array.from(files).map(file => ({
            file: file,
            name: file.name,
            url: URL.createObjectURL(file),
            has_watermark: false,
            belongs_to: []
        }));
        setFiles(prevImages => [...prevImages, ...newImages]);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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

    const updateFileWatermark = (index: number, hasWatermark: boolean) => {
        setFiles(prevImages => {
            const newImages = [...prevImages];
            newImages[index].has_watermark = hasWatermark;
            return newImages;
        });
    };

    const handleSubmit = () => {
        files.forEach(image => {
            console.info('Image:', image);
        });
    }

    const value = {
        files,
        setFiles,
        handleFiles,
        handleDrop,
        handleFileChange,
        updateFileName,
        updateFileWatermark,
        handleSubmit,
    };

    return <ImagesUploadContext.Provider value={value}>{children}</ImagesUploadContext.Provider>;
};

export const useImagesUpload = () => {
    return useContext(ImagesUploadContext);
}