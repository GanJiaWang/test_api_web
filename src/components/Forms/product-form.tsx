import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextInput } from "@components/Fields";
import {
    required,
    requiredNumber,
    composeValidators,
    minValue,
} from "@utils/form-validator.utils";

interface FormProps {
    description?: string;
    category: string;
    name: string;
    price: number;
}

export const ProductForm = (props: {
    id?: any;
    setEdit?: any;
    setId?: any;
}) => {
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
            initialValues={{ category: "", name: "", price: 0 }}
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
                                label="Product Name"
                                name="name"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Product Name"
                                validate={required}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                label="Description"
                                name="description"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Description"
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Category"
                                name="category"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Category"
                                validate={required}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Price"
                                name="price"
                                formLayout="vertical"
                                component={TextInput}
                                placeholder="Price"
                                validate={composeValidators(
                                    requiredNumber,
                                    minValue(1)
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
