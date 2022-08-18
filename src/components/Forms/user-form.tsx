import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextInput } from "@components/Fields";
import {
    required,
    composeValidators,
    email,
    phoneNumber,
} from "@utils/form-validator.utils";

interface FormProps {
    email: string;
    password?: string;
    name: string;
    contactNo: string;
}

export const UserForm = (props: { id?: any; setEdit?: any; setId?: any }) => {
    const { id, setEdit, setId } = props;
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (formValues: FormProps) => {
        setSubmitting(true);
        try {
            console.log(formValues);
            setEdit(false);
            if (id) setId();
            //   await requestLogin(formValues)();
        } catch (e) {
            //   printErrorMessage(e);
        }
        setSubmitting(false);
    };

    const onCancel = () => {
        setEdit(false);
        if (id) setId();
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: "", name: "", contactNo: "" }}
        >
            <Form>
                <div className="mx-40">
                    <Row
                        justify="center"
                        align="middle"
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Email"
                                name="email"
                                type="email"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Email"
                                validate={composeValidators(required, email)}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required={!id}
                                label="Password"
                                name="password"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Password"
                                type="password"
                                validate={!id && composeValidators(required)}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Full Name"
                                name="name"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Full Name"
                                validate={composeValidators(required)}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Contact No"
                                name="contactNo"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Contact No"
                                validate={composeValidators(
                                    required,
                                    phoneNumber
                                )}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={onCancel}
                                style={{
                                    borderRadius: 20,
                                    height: 40,
                                    width: 100,
                                }}
                                loading={submitting}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{
                                    borderRadius: 20,
                                    height: 40,
                                    width: 100,
                                }}
                                type="primary"
                                htmlType="submit"
                                loading={submitting}
                            >
                                Create
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Formik>
    );
};
