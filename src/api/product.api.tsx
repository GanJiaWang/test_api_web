import { notification } from "antd";
import { apiCaller } from "./index";

export const getProducts = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get("products");
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const createProducts = (formValues: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.post("products/create", formValues);
            const { data } = res;
            notification.success({
                message: "Success!",
                description: data.message,
            });
            return resolve(data);
        } catch (e) {
            return reject(e);
        }
    });

export const getProduct = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get(`products/${id}`);
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const updateProducts = ({ id, formValues }: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.put(`products/${id}`, formValues);
            const { data } = res;
            notification.success({
                message: "Success!",
                description: data.message,
            });
            return resolve(data);
        } catch (e) {
            return reject(e);
        }
    });

export const deleteProducts = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.delete(`products/${id}`);
            const { data } = res;
            notification.success({
                message: "Success!",
                description: data.message,
            });
            return resolve(res);
        } catch (e) {
            return reject(e);
        }
    });
