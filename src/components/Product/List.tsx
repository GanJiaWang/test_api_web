/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductForm } from "@components/Forms";
import React, { useEffect, useState } from "react";
import { getProducts, deleteProducts } from "../../api/product.api";

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
        render: (description) => (
            <div>{description === "undefined" ? "" : description}</div>
        ),
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
                    onClick={() => onclick.edit(data)}
                    type="primary"
                    icon={<EditOutlined />}
                    shape="circle"
                />
                <Button
                    onClick={() => onclick.delete(data)}
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
    const [data, setData] = useState() as any;

    const onEdit = (data: any) => {
        setId(data.id);
        setEdit(true);
    };

    const onDelete = async (data: any) => {
        await deleteProducts(data.id);
        getProductsData();
    };

    const getProductsData = async () => {
        const users: any = await getProducts();
        setData(
            _.map(users, (a, i: number) => {
                return {
                    ...a,
                    key: ++i,
                    onclick: { edit: onEdit, delete: onDelete },
                };
            })
        );
    };

    useEffect(() => {
        getProductsData();
    }, []);

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <ProductForm
            setEdit={setEdit}
            setId={setId}
            getProductsData={getProductsData}
        />
    ) : (
        <ProductForm
            id={id}
            setEdit={setEdit}
            setId={setId}
            getProductsData={getProductsData}
        />
    );
};

export default List;
