import { Form, InputNumber } from "antd";
import React from "react";

interface FormProps {
    label?: string;
    name: string;
    rules?: Array<object>;
    required?: boolean;
    placeholder?: string;
    prefix?: boolean;
}

export const NumberInput: React.FC<FormProps> = ({
    label,
    name,
    rules,
    required,
    placeholder,
    prefix,
}) => (
    <Form.Item
        label={label}
        name={name}
        rules={rules}
        required={required}
        labelCol={{ className: "font-bold" }}
    >
        <InputNumber
            placeholder={placeholder}
            className="w-full"
            prefix={prefix ? "S$" : undefined}
        />
    </Form.Item>
);
