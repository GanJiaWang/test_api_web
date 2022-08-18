/* eslint-disable jsx-a11y/alt-text */
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const { Dragger } = Upload;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const ImagePicker: React.FC = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
    const [selectedFileList, setSelectedFileList] = useState<any>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [height, setHeight] = useState<number>();
    const [width, setWidth] = useState<number>();

    useEffect(() => {
        setHeight(isMobile ? 150 : 400);
        setWidth(isMobile ? 150 : 400);
    }, [isMobile]);

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        setSelectedFileList([info.file]);
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImageUrl(url);
        });
    };

    return (
        <div className="w-400px pt-7 xs:w-32">
            <Dragger
                fileList={selectedFileList || []}
                showUploadList={false}
                onChange={handleChange}
                listType="picture-card"
                maxCount={5}
            >
                {imageUrl ? (
                    <Image src={`${imageUrl}`} height={height} width={width} />
                ) : (
                    <div className="h-400px w-400px table-cell align-middle bg-white border-zinc-500 border-solid shadow-md xs:w-32 xs:h-32">
                        <p className="ant-upload-drag-icon mb-0">
                            <Image
                                src="/icons/add-image.png"
                                height={35}
                                width={40}
                                alt="icon"
                            />
                        </p>
                        <p className="ant-upload-text font-semibold text-md">
                            Add Image
                        </p>
                    </div>
                )}
            </Dragger>
        </div>
    );
};
