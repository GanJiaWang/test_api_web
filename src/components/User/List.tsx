import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserForm } from "@components/Forms";
import React, { useState } from "react";

interface DataType {
    key: string;
    name: string;
    email: string;
    contactNo: string;
    onclick?: object;
}

const columns: ColumnsType<DataType> = [
    {
        title: "No",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Contact No",
        dataIndex: "contactNo",
        key: "contactNo",
    },
    {
        title: "Action",
        key: "action",
        dataIndex: "onclick",
        className: "text-center",
        render: (onclick, data) => (
            <Space size="middle">
                <Button
                    onClick={() => onclick.edit(data.key)}
                    type="primary"
                    icon={<EditOutlined />}
                    shape="circle"
                />
                <Button
                    onClick={() => onclick.delete(data.key)}
                    type="primary"
                    icon={<DeleteOutlined />}
                    shape="circle"
                    danger
                />
            </Space>
        ),
    },
];

interface Props {
    edit: boolean;
    setEdit: Function;
}

const List: React.FC<Props> = ({ edit, setEdit }) => {
    const [id, setId] = useState();

    const onEdit = (key: any) => {
        setId(key);
        setEdit(true);
    };

    const onDelete = () => {};

    const data: DataType[] = [
        {
            key: "1",
            name: "Ali",
            email: "ali@gmail.com",
            contactNo: "0111222333",
            onclick: { edit: onEdit, delete: onDelete },
        },
        {
            key: "2",
            name: "Abu",
            email: "abu@gmail.com",
            contactNo: "0123456789",
            onclick: { edit: onEdit, delete: onDelete },
        },
    ];

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <UserForm setEdit={setEdit} setId={setId} />
    ) : (
        <UserForm id={id} setEdit={setEdit} setId={setId} />
    );
};

export default List;
