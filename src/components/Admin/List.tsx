/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { ADMIN_ROLE } from "@constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AdminForm } from "@components/Forms";
import React, { useEffect, useState } from "react";
import { getAdmins, deleteAdmins } from "../../api/admin.api";

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
        await deleteAdmins(data.id);
        getAdminsData();
    };

    const getAdminsData = async () => {
        const admins: any = await getAdmins();
        setData(
            _.map(admins, (a, i: number) => {
                return {
                    ...a,
                    key: ++i,
                    onclick: { edit: onEdit, delete: onDelete },
                };
            })
        );
    };

    useEffect(() => {
        getAdminsData();
    }, []);

    return !edit ? (
        <Table bordered columns={columns} dataSource={data} />
    ) : !id ? (
        <AdminForm
            setEdit={setEdit}
            setId={setId}
            getAdminsData={getAdminsData}
        />
    ) : (
        <AdminForm
            id={id}
            setEdit={setEdit}
            setId={setId}
            getAdminsData={getAdminsData}
        />
    );
};

export default List;
