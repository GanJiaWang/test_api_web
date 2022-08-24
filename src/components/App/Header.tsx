import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown } from "antd";
import { useRouter } from "next/router";
import React from "react";

const { Header } = Layout;

interface Props {
    collapsed: boolean;
    setCollapsed: Function;
    setAuth: Function;
}

const HeaderComponents: React.FC<Props> = ({
    collapsed,
    setCollapsed,
    setAuth,
}) => {
    const router = useRouter();

    const onLogout = () => {
        router.push("/");
        setAuth(false);
    };

    const UserDropDownMenu = (
        <Menu>
            <Menu.Item>
                <a onClick={onLogout}>
                    <div className="text-red-500 flex items-center">
                        <LogoutOutlined className="mr-2" />
                        Logout
                    </div>
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            className="site-layout-background first-header"
            style={{ padding: 0 }}
        >
            {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                }
            )}
            <Dropdown
                overlay={UserDropDownMenu}
                placement="bottomRight"
                className="cursor-pointer float-right px-3"
            >
                <span className="icon action mr-3">
                    <UserOutlined />
                    <span className="ml-2">Admin</span>
                </span>
            </Dropdown>
        </Header>
    );
};

export default HeaderComponents;
