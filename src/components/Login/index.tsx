/* eslint-disable jsx-a11y/alt-text */
import { Image, Row, Col, Card } from "antd";
import { LoginForm } from "@components/Forms";


const LoginComponents: React.FC = () => {
    return (
        <div className="container-fluid h-screen">
            <Row justify="center" align="middle" className="login-wrapper">
                <Col xs={22} sm={16} md={12} lg={8} xl={8}>
                    <Card
                        bordered={false}
                        hoverable={false}
                        className="login-card"
                        style={{ padding: 30 }}
                    >
                        <div className="w-full flex justify-center">
                            <Image
                                className="mb-5"
                                preview={false}
                                width={200}
                                src="https://www.seekpng.com/png/detail/247-2474955_ecommerce-ecommerce-png.png"
                            />
                        </div>
                        <h1 className="login-title text-yellow-600 text-bold">
                            E-Commerce
                        </h1>
                        <h2 className="login-title text-xl">
                            ADMIN DASHBOARD | LOGIN
                        </h2>
                        <LoginForm />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginComponents;
