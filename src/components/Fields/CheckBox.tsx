import { Form, Checkbox } from "antd";
import React from "react";

interface FormProps {
    label?: string;
    name: string;
    rules?: Array<object>;
    required?: boolean;
    message?: string;
}

export const CheckBox: React.FC<FormProps> = ({
    label,
    name,
    rules,
    required,
    message,
}) => (
    <Form.Item
        label={label}
        name={name}
        rules={rules}
        required={required}
        labelCol={{ className: "font-bold" }}
        valuePropName="checked"
    >
        <Checkbox>
            <div className="ml-3 text-xs">{message}</div>
        </Checkbox>
    </Form.Item>
);
