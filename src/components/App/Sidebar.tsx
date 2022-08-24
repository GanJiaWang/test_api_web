import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const { Sider } = Layout;

interface Props {
    collapsed: boolean;
    sidebarKey: string;
    setSidebarKey: Function;
}

interface OnGoProps {
    link: string;
    key?: string;
}

const SidebarComponents: React.FC<Props> = ({
    collapsed,
    sidebarKey,
    setSidebarKey,
}) => {
    const router = useRouter();

    const onGo = ({ link, key }: OnGoProps) => {
        if (key) setSidebarKey(key);
        router.push(`/${link}`);
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={225}>
            <div
                onClick={() => onGo({ link: "admin" })}
                className="sidebar-logo"
            >
                LOGO
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[sidebarKey]}
                items={[
                    {
                        key: "1",
                        icon: <UserOutlined />,
                        label: "Admin Management",
                        onClick: () => onGo({ link: "admin", key: "1" }),
                    },
                    {
                        key: "2",
                        icon: <UserOutlined />,
                        label: "User Management",
                        onClick: () => onGo({ link: "user", key: "2" }),
                    },
                    {
                        key: "3",
                        icon: <ShopOutlined />,
                        label: "Product Management",
                        onClick: () => onGo({ link: "product", key: "3" }),
                    },
                ]}
            />
        </Sider>
    );
};

export default SidebarComponents;
