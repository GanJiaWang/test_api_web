import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductForm } from "@components/Forms";
import React, { useState } from "react";

interface DataType {
    key: string;
    name: string;
    description: string;
    category: string;
    price: number;
    onclick?: object;
}

const columns: ColumnsType<DataType> = [
    {
        title: "No",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => <div>$ {price}</div>,
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
            name: "Pizza",
            description: "Cheese Pizza",
            category: "Food",
            price: 50,
            onclick: { edit: onEdit, delete: onDelete },
        },
    ];

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <ProductForm setEdit={setEdit} setId={setId} />
    ) : (
        <ProductForm id={id} setEdit={setEdit} setId={setId} />
    );
};

export default List;
