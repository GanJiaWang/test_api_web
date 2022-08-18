import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const { Sider } = Layout;

interface Props {
    collapsed: boolean;
}

const SidebarComponents: React.FC<Props> = ({ collapsed }) => {
    const router = useRouter();
    const selected = router.query.selectedValue
        ? `${router.query.selectedValue}`
        : "1";
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={225}>
            <div onClick={() => router.push("/admin")} className="sidebar-logo">
                LOGO
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selected]}
                items={[
                    {
                        key: "1",
                        icon: <UserOutlined />,
                        label: "Admin Management",
                        onClick: () =>
                            router.push({
                                pathname: `/admin`,
                                query: { selectedValue: "1" },
                            }),
                    },
                    {
                        key: "2",
                        icon: <UserOutlined />,
                        label: "User Management",
                        onClick: () =>
                            router.push({
                                pathname: `/user`,
                                query: { selectedValue: "2" },
                            }),
                    },
                    {
                        key: "3",
                        icon: <ShopOutlined />,
                        label: "Product Management",
                        onClick: () =>
                            router.push({
                                pathname: `/product`,
                                query: { selectedValue: "3" },
                            }),
                    },
                ]}
            />
        </Sider>
    );
};

export default SidebarComponents;
