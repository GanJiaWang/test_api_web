/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextInput, NumberInput } from "@components/Fields";
import {
    required,
    requiredNumber,
    composeValidators,
    minValue,
} from "@utils/form-validator.utils";
import {
    updateProducts,
    createProducts,
    getProduct,
} from "../../api/product.api";

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
    getProductsData?: any;
}) => {
    const { id, setEdit, setId, getProductsData } = props;
    const [submitting, setSubmitting] = useState(false);
    const [oneProduct, setOneProduct] = useState() as any;

    useEffect(() => {
        if (id) getOneProduct();
    }, []);

    const getOneProduct = async () => {
        const data = await getProduct(id);
        setOneProduct(data);
    };

    const handleSubmit = async (formValues: FormProps) => {
        setSubmitting(true);
        try {
            if (id) {
                await updateProducts({ id, formValues });
                setId();
            } else {
                await createProducts(formValues);
            }
            setSubmitting(false);
            getProductsData();
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
                category: oneProduct ? oneProduct.category : "",
                name: oneProduct ? oneProduct.name : "",
                price: oneProduct ? oneProduct.price : "",
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
                                label="Product Name"
                                name="name"
                                component={TextInput}
                                placeholder="Product Name"
                                validate={required}
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                label="Description"
                                name="description"
                                component={TextInput}
                                placeholder="Description"
                            />
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                            <Field
                                required
                                label="Category"
                                name="category"
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
                                component={NumberInput}
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
