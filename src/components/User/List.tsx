/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { UserForm } from "@components/Forms";
import React, { useEffect, useState } from "react";
import { getUsers, deleteUsers } from "../../api/user.api";

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
        await deleteUsers(data.id);
        getUsersData();
    };

    const getUsersData = async () => {
        const users: any = await getUsers();
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
        getUsersData();
    }, []);

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <UserForm setEdit={setEdit} setId={setId} getUsersData={getUsersData} />
    ) : (
        <UserForm
            id={id}
            setEdit={setEdit}
            setId={setId}
            getUsersData={getUsersData}
        />
    );
};

export default List;
