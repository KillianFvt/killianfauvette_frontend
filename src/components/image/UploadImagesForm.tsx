import {useImagesUpload, ImagesUploadContextType} from "../../providers/ImagesUploadProvider";
import {UploadImage} from "./UploadImage";
import './UploadImageForm.scss';
import {useEffect, useState} from "react";

export const UploadImagesForm = () => {
    const {
        files,
        handleFileChange,
        handleDrop,
        handleSubmit
    }: ImagesUploadContextType = useImagesUpload();

    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        const handleDragEnter = () => setIsDragging(true);
        const handleDragLeave = () => setIsDragging(false);
        const handleDropEvent = () => setIsDragging(false);

        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', handleDropEvent);

        return () => {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', handleDropEvent);
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className={"upload-images-form"}>

            <div className={"images-preview"}>
                {
                    files.map((file, index) => (
                        <UploadImage key={index} index={index}/>
                    ))
                }
            </div>

            <input
                type={"file"} multiple={true}
                id={"file-input"}
                name={"files"}
                onChange={handleFileChange}
                accept={"image/*"}
                style={{display: 'none'}}
            />

            <label
                htmlFor={"file-input"}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            >
                {isDragging ? 'Drop here' : 'Drag and drop images here'}
            </label>

            <button type={"submit"}>Submit (fake)</button>
        </form>
    );
};