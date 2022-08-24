import React, { useState } from "react";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { TextInput } from "@components/Fields";
import { useRouter } from "next/router";
import {
    required,
    email,
    composeValidators,
    maxLength,
} from "@utils/form-validator.utils";
import { requestLoginUser } from "../../api/login.api";

interface FormProps {
    email: string;
    password: string;
}

interface Props {
    setAuth: Function;
}

export const LoginForm: React.FC<Props> = ({ setAuth }) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (formValues: FormProps) => {
        setSubmitting(true);
        try {
            await requestLoginUser(formValues);
            router.push("/admin").then(() => {
                setAuth(true);
                setSubmitting(false);
            });
        } catch (e) {}
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: "", password: "" }}
        >
            <Form className="py-5">
                <Field
                    style={{ borderRadius: 20, height: 40 }}
                    name="email"
                    component={TextInput}
                    placeholder="Email"
                    prefix={<UserOutlined />}
                    validate={composeValidators(required, email)}
                    autoFocus
                />
                <Field
                    style={{ borderRadius: 20, height: 40 }}
                    name="password"
                    component={TextInput}
                    placeholder="Password"
                    type="password"
                    prefix={<LockOutlined />}
                    validate={composeValidators(required, maxLength(100))}
                />
                <Button
                    style={{ borderRadius: 20, height: 40 }}
                    type="primary"
                    block
                    htmlType="submit"
                    loading={submitting}
                >
                    Login
                </Button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
