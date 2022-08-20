import { notification } from "antd";
import { apiCaller } from "./index";

export const getUsers = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get("users");
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const createUsers = (formValues: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.post("users/create", formValues);
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

export const getUser = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get(`users/${id}`);
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const updateUsers = ({ id, formValues }: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.put(`users/${id}`, formValues);
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

export const deleteUsers = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.delete(`users/${id}`);
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
