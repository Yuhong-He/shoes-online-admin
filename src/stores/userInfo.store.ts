import {defineStore} from "pinia";
import {httpInstance} from "@/apis";
import router from "@/router";

export const useUserInfoStore = defineStore("userinfo-store", () => {
    const setAuth = (token: string) => {
        httpInstance.defaults.headers.common.Authorization = token;
        localStorage.setItem("token", token);
    };
    const authFromLocal = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuth(token);
            return true;
        }
        return false;
    };
    const removeAuth = () => {
        delete httpInstance.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
        router.push("/login").then(() => {});
    };
    return {
        setAuth,
        authFromLocal,
        removeAuth
    };
});
