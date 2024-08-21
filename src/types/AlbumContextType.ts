import {ImageData} from "./ImageData";
import React, {Dispatch, SetStateAction} from "react";
import {AlbumData} from "./AlbumData";

export interface AlbumContextType {
    files: ImageData[];
    setFiles: Dispatch<SetStateAction<ImageData[]>>;
    userIds: number[];
    setUserIds: Dispatch<SetStateAction<number[]>>;
    albumData: AlbumData;
    setAlbumData: Dispatch<SetStateAction<AlbumData>>;
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