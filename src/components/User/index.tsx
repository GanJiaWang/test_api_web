import { Layout, PageHeader, Button } from "antd";
import { useState } from "react";
import List from "./List";

const { Content } = Layout;

const UserComponents: React.FC = () => {
    const [edit, setEdit] = useState(false);

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
            }}
        >
            <PageHeader
                className="p-0 pb-5"
                title="User Management"
                extra={
                    !edit && (
                        <Button
                            onClick={() => setEdit(true)}
                            type="primary"
                            shape="round"
                        >
                            Create
                        </Button>
                    )
                }
            />
            <List edit={edit} setEdit={setEdit} />
        </Content>
    );
};

export default UserComponents;
