import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { ADMIN_ROLE } from "@constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AdminForm } from "@components/Forms";
import React, { useState } from "react";

interface DataType {
    key: string;
    name: string;
    email: string;
    role: number;
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
        title: "Role",
        key: "role",
        dataIndex: "role",
        className: "text-center",
        render: (role) => (
            <Tag
                color={_.get(
                    _.find(ADMIN_ROLE, (a) => a.value === role),
                    "color"
                )}
                key={role}
            >
                {_.get(
                    _.find(ADMIN_ROLE, (a) => a.value === role),
                    "label",
                    "-"
                )}
            </Tag>
        ),
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
            name: "Master Admin",
            email: "masteradmin@gmail.com",
            role: 1,
            onclick: { edit: onEdit, delete: onDelete },
        },
        {
            key: "2",
            name: "Admin",
            email: "admin@gmail.com",
            role: 2,
            onclick: { edit: onEdit, delete: onDelete },
        },
    ];

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <AdminForm setEdit={setEdit} setId={setId} />
    ) : (
        <AdminForm id={id} setEdit={setEdit} setId={setId} />
    );
};

export default List;
