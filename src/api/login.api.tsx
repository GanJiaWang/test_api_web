import { notification } from "antd";
import { apiCaller } from "./index";

export const requestLoginUser = async (formData: any) => {
   return new Promise(async (resolve, reject) => {
        try {
            const res = await apiCaller.post("login", formData);
            const { data } = res;
            notification.success({
                message: "Success!",
                description: data.message,
            });
            return resolve(res.data.results);
        } catch (e: any) {
            notification.error({
                message: "Failed!",
                description: e.response.data
                    ? e.response.data.message
                    : "Something Wrong!",
            });
            return reject(e);
        }
    });
};
