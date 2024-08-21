import './AlbumImagesForm.scss';
import {useAlbumEdit} from "../../providers/AlbumProvider";
import {AlbumContextType} from "../../types/AlbumContextType";
import {AlbumImageEdit} from "./AlbumImageEdit";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ImageData} from "../../types/ImageData";
import {UserSelector} from "../search/UserSelector";
import Masonry from "react-masonry-css";
import {AlbumDataEditor} from "./AlbumDataEditor";

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
    }: AlbumContextType = useAlbumEdit();

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

    const columnsBreakpoints = useRef({
        default: 4,
        1100: 3,
        700: 2,
    });

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

                <AlbumDataEditor/>

                <UserSelector setUserIds={setUserIds} userIds={userIds}/>

                {files.length > 0 &&
		            <div id={'all-files-modifications'}>
                    <textarea
	                    name="all-file-names" id="all-file-names"
                        form={"album-images-form"}
	                    onChange={handleAllFileNames}
                    />
			            <label>
				            <input
					            type="checkbox" form={"album-images-form"}
					            onChange={handleAllFileWatermarks}
				            />
				            All images have watermark
			            </label>
		            </div>
                }

                <button
                    id={'save-button'} onClick={handleSubmit}
                    type={'button'}
                >Save</button>
            </div>

            <form id={"album-images-form"}>

                <Masonry
                    className={"images-preview"}
                    columnClassName={"images-preview-column"}
                    breakpointCols={columnsBreakpoints.current}
                >
                    {
                        files.map((file: ImageData, index: number) => (
                            <AlbumImageEdit key={index} index={index}/>
                        ))
                    }
                </Masonry>

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