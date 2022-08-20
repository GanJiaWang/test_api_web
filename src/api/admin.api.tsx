import { notification } from "antd";
import { apiCaller } from "./index";

export const getAdmins = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get("admins");
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const createAdmins = (formValues: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.post("admins/create", formValues);
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

export const getAdmin = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.get(`admins/${id}`);
            return resolve(res.data.results);
        } catch (e) {
            return reject(e);
        }
    });

export const updateAdmins = ({ id, formValues }: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.put(`admins/${id}`, formValues);
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

export const deleteAdmins = (id: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.delete(`admins/${id}`);
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
