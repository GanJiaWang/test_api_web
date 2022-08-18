import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { Button, Upload, Form } from "antd";
import React, { useState } from "react";

interface FormProps {
    label?: string;
    name: string;
    rules?: Array<object>;
    required?: boolean;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const UploadImage: React.FC<FormProps> = ({
    label,
    name,
    rules,
    required,
}) => {
    const [selectedFileList, setSelectedFileList] = useState<any>();

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status !== "removed") setSelectedFileList([info.file]);
    };

    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
            required={required}
            labelCol={{ className: "font-bold" }}
        >
            <Upload
                fileList={selectedFileList || []}
                onChange={handleChange}
                maxCount={1}
                onRemove={() => setSelectedFileList([])}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
    );
};
