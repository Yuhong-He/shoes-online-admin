import axios, {AxiosError} from "axios";
import type {AxiosRequestConfig} from "axios";
import {ElLoading, ElMessage} from "element-plus";

export const httpInstance = axios.create();

export type BkResponse = {
    data: any;
    code: number;
    message: string;
    succeed: true
}

httpInstance.defaults.baseURL = import.meta.env.VITE_BASEURL;

export const $http = async (config: AxiosRequestConfig) => {
    const loadingInstance = ElLoading.service();
    try {
        const axiosResponse = await httpInstance<BkResponse>(config);
        const bkResponse = axiosResponse.data;
        if (!bkResponse?.succeed) {
            let errTitle: string;
            if (bkResponse.code === 401) {
                errTitle = "Unauthorised";
            } else if (bkResponse.code === 403) {
                errTitle = "Forbidden";
            } else if (bkResponse.code === 9999) {
                errTitle = "9999 Error";
            } else if (bkResponse.code === 500) {
                errTitle = "Server Error";
            } else {
                errTitle = "Unknown Error";
            }
            ElMessage.error(errTitle);
            const err = new Error(bkResponse?.message || 'Unknown');
            err.name = errTitle;
            throw err;
        }
        return bkResponse;
    } catch (e) {
        if (e instanceof AxiosError) {
            ElMessage.error("Network Error");
        }
    } finally {
        loadingInstance.close();
    }
};
