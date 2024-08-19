import './AlbumImagesForm.scss';
import {useImagesUpload} from "../../providers/AlbumProvider";
import {AlbumContextType} from "../../types/AlbumContextType";
import {AlbumImageEdit} from "./AlbumImageEdit";
import {ChangeEvent, useEffect, useState} from "react";
import {ImageData} from "../../types/ImageData";
import {UserSelector} from "../search/UserSelector";

export const AlbumImagesForm = () => {
    const {
        files,
        userIds,
        setUserIds,
        handleFileChange,
        handleDrop,
        handleSubmit,
        updateAllFileWatermarks,
        updateAllFileNames,
    }: AlbumContextType = useImagesUpload();

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
        <div className={"album-images-form"}>
            <div className={'album-details-forms'}>
                <UserSelector setUserIds={setUserIds} userIds={userIds}/>

                <button id={'save-button'} type={"submit"} form={"album-images-form"}>Save</button>
            </div>

            <form onSubmit={handleSubmit} id={"album-images-form"}>

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
                        files.map((file: ImageData, index: number) => (
                            <AlbumImageEdit key={index} index={index}/>
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
            </form>
        </div>
    );
};