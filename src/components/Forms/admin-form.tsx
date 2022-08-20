/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextInput } from "@components/Fields";
import {
    required,
    composeValidators,
    email,
} from "@utils/form-validator.utils";
import { updateAdmins, createAdmins, getAdmin } from "../../api/admin.api";

interface FormProps {
    email: string;
    password?: string;
    name: string;
}

export const AdminForm = (props: {
    id?: any;
    setEdit?: any;
    setId?: any;
    getAdminsData?: any;
}) => {
    const { id, setEdit, setId, getAdminsData } = props;
    const [submitting, setSubmitting] = useState(false);
    const [oneAdmin, setOneAdmin] = useState() as any;

    useEffect(() => {
        if (id) getOneAdmin();
    }, []);

    const getOneAdmin = async () => {
        const data = await getAdmin(id);
        setOneAdmin(data);
    };

    const handleSubmit = async (formValues: FormProps) => {
        setSubmitting(true);
        try {
            if (id) {
                await updateAdmins({ id, formValues });
                setId();
            } else {
                await createAdmins(formValues);
            }
            setSubmitting(false);
            getAdminsData();
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
                email: oneAdmin ? oneAdmin.email : "",
                name: oneAdmin ? oneAdmin.name : "",
            }}
        >
            <Form>
                <div className="w-1/3">
                    <Row
                        justify="center"
                        align="middle"
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                        <Col span={24}>
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
                        <Col span={24}>
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
                        <Col span={24}>
                            <Field
                                required
                                label="Full Name"
                                name="name"
                                component={TextInput}
                                placeholder="Full Name"
                                validate={composeValidators(required)}
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
