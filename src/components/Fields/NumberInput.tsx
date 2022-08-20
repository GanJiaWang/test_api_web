/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { InputNumber } from "antd";
import _ from "lodash";
import FormItem, { omitFormikProps } from "./FormItem";

export const NumberInput = (props: any) => {
  const { form, field, onChangeValue } = props;
  const { setFieldValue } = form;

  const handleChange = (number: any) => {
    setFieldValue(field.name, _.toNumber(number));
    if (onChangeValue) onChangeValue(number);
  };

  return (
    // @ts-ignore
    <FormItem {...props}>
      <InputNumber
        {...omitFormikProps(props)}
        onChange={handleChange}
        value={field.value ? _.toNumber(field.value) : 0}
        style={{ width: "100%" }}
        className="number-input body-s-14 text-black rounded-md border-gray-200"
      />
    </FormItem>
  );
};

export default NumberInput;
