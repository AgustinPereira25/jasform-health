import React, { useRef, useState } from "react";

import { tw } from "@/utils"; //Usamos esto para que quede mas legible y aparte ser mas amigables con Laravel (resuelve conflictos)
// import axios from "axios";
import { icons } from "@/ui";

export const FileUploader: React.FC = () => {
    const [fileList, setFileList] = useState<File[] | null>(null);
    const [ shouldHighlight, setShouldHighlight ] = useState<boolean>(false);

    const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMultiUpload = () => {
        // const UPLOAD_URL = "/api/upload";
        const data = new FormData();
        
        for (const file of fileList!) {
            data.append(file.name, file);
        }
        //ToDo: Agregar el post a upload URL con la data
        // await axios.post(UPLOAD_URL, data);
    }
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleSingleFile = (file: File) => {
        const fileToUpload: File[] = [file];
        setFileList(fileToUpload);
        
        // const UPLOAD_URL = "/api/upload";
        const data = new FormData();
        data.append(fileToUpload[0]!.name, fileToUpload[0]!);
        //ToDo: Agregar el post a upload URL con la data
        // await axios.post(UPLOAD_URL, data);
    };
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFileList(null);
        const fileUploaded:File | null = e.target.files![0]!;
        fileUploaded &&
            handleSingleFile(fileUploaded);
    };

    return (
        <div
            className={tw(
                "w-full h-full",
                // "w-80 ",
                "p-4 grid place-content-center cursor-pointer",
                "text-sm text-[#4B5563] rounded-lg hover:bg-gray-100",
                "border-4 border-dashed border-[#D1D5DB] hover:border-gray-400",
                "transition-colors",
                shouldHighlight ? "border-gray-400 bg-gray-400" : "border-[#D1D5DB]",
            )}
            onDragOver={(e) => {
                preventDefaultHandler(e);
                setShouldHighlight(true);
            }}
            onDragEnter={(e) => {
                preventDefaultHandler(e);
                setShouldHighlight(true);
            }}
            onDragLeave={(e) => {
                preventDefaultHandler(e);
                setShouldHighlight(false);
            }}
            onDrop={(e) => {
                preventDefaultHandler(e);
                const files = Array.from(e.dataTransfer.files);
                const wrongFile = !fileList?.find((file) => file.type.indexOf("image") === -1);
                if (wrongFile) {
                    alert("Please upload only images");
                    return;
                }
                setFileList(files);
                setShouldHighlight(false);
            }}
        >
            <div className="flex flex-col items-center m-5">
                {!fileList ? (
                    <>
                        <icons.UploadIcon className="mb-3"/>
                        <div className="flex flex-col items-center">
                            <span>
                                <button 
                                    className="text-blue-600"
                                    onClick={handleClick}

                                >
                                    Upload a file&nbsp;
                                </button> 
                                or drag and drop
                            </span>
                            <span className="text-[#6B7280] text-xs font-light">PNG, JPG up to 3MB</span>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Files to Upload</p>
                        {fileList.map((file, i) => {
                            return <span key={i}>{file.name}</span>;
                        })}
                        <div className="flex gap-2 mt-2">
                            <button 
                                className="bg-gray-500 text-gray-50 px-2 py-1 rounded-md"
                                onClick={() => handleMultiUpload()}
                            >
                                Upload
                            </button>
                            <button
                                className="border border-gray-500 px-2 py-1 rounded-md"
                                onClick={() => {
                                    setFileList(null);
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </>
                )}
                <input type="file"
                    ref={hiddenFileInput}
                    onChange={(e) => handleChange(e)}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
            </div>
        </div>
    );
};

export default FileUploader;