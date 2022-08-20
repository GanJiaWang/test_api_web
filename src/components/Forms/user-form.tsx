/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextInput } from "@components/Fields";
import {
    required,
    composeValidators,
    email,
    phoneNumber,
} from "@utils/form-validator.utils";
import { updateUsers, createUsers, getUser } from "../../api/user.api";

interface FormProps {
    email: string;
    password?: string;
    name: string;
    contactNo: string;
}

export const UserForm = (props: {
    id?: any;
    setEdit?: any;
    setId?: any;
    getUsersData?: any;
}) => {
    const { id, setEdit, setId, getUsersData } = props;
    const [submitting, setSubmitting] = useState(false);
    const [oneUser, setOneUser] = useState() as any;

    useEffect(() => {
        if (id) getOneUser();
    }, []);

    const getOneUser = async () => {
        const data = await getUser(id);
        setOneUser(data);
    };

    const handleSubmit = async (formValues: FormProps) => {
        setSubmitting(true);
        try {
            if (id) {
                await updateUsers({ id, formValues });
                setId();
            } else {
                await createUsers(formValues);
            }
            setSubmitting(false);
            getUsersData();
            setEdit(false);
        } catch (e) {
            setSubmitting(false);
        }
    };

    const onCancel = () => {
        setEdit(false);
        if (id) setId();
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={{
                email: oneUser ? oneUser.email : "",
                name: oneUser ? oneUser.name : "",
                contactNo: oneUser ? oneUser.contactNo : "",
            }}
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
