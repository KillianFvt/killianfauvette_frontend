import {useImagesUpload, ImagesUploadContextType} from "../../providers/ImagesUploadProvider";
import {UploadImage} from "./UploadImage";
import './UploadImageForm.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {NewImageData} from "../../types/NewImageData";
import {UserSelector} from "../search/UserSelector";

export const UploadImagesForm = () => {
    const {
        files,
        userIds,
        setUserIds,
        handleFileChange,
        handleDrop,
        handleSubmit,
        updateAllFileWatermarks,
        updateAllFileNames,
    }: ImagesUploadContextType = useImagesUpload();

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const handleAllFileNames = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newFileName: string = e.target.value.replaceAll('\n', '');
        newFileName = newFileName.replaceAll('\r', '');
        newFileName = newFileName.replaceAll(' ', '_');
        updateAllFileNames(newFileName);
        e.target.value = newFileName;
    }
    const handleAllFileWatermarks = (e: ChangeEvent<HTMLInputElement>) => {
        updateAllFileWatermarks(e.target.checked);
    }

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
        <div className={"upload-images-form"}>
            <form onSubmit={handleSubmit}>

                {files.length > 0 &&
				    <div id={'all-files-modifications'}>
                    <textarea
	                    name="all-file-names" id="all-file-names"
	                    onChange={handleAllFileNames}
                    />
					    <label>
						    <input
							    type="checkbox"
							    onChange={handleAllFileWatermarks}
						    />
						    All images have watermark
					    </label>
				    </div>
                }

                <div className={"images-preview"}>
                    {
                        files.map((file: NewImageData, index) => (
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

            <UserSelector setUserIds={setUserIds} userIds={userIds}/>
        </div>
    );
};