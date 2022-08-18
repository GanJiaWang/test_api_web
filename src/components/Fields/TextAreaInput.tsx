import { Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

interface FormProps {
    label?: string;
    name: string;
    rules?: Array<object>;
    required?: boolean;
    placeholder?: string;
}

export const TextAreaInput: React.FC<FormProps> = ({
    label,
    name,
    rules,
    required,
    placeholder,
}) => (
    <Form.Item
        label={label}
        name={name}
        rules={rules}
        required={required}
        labelCol={{ className: "font-bold" }}
    >
        <TextArea showCount maxLength={200} placeholder={placeholder} />
    </Form.Item>
);
