import { Select, Form } from "antd";
import React from "react";

interface FormProps {
    label?: string;
    name: string;
    rules?: Array<object>;
    required?: boolean;
    placeholder?: string;
}

const children: React.ReactNode[] = [];

export const SelectInput: React.FC<FormProps> = ({
    label,
    name,
    rules,
    required,
    placeholder,
}) => {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
            required={required}
            labelCol={{ className: "font-bold" }}
        >
            <Select
                mode="tags"
                placeholder={placeholder}
                style={{ width: "100%" }}
            >
                {children}
            </Select>
        </Form.Item>
    );
};
