import {defineStore} from "pinia";
import {httpInstance} from "@/apis";
import router from "@/router";
import {ref} from "vue";

export interface Userinfo {
    "avater": string,
    "email": string,
    "gender": number,
    "integration": number,
    "nickname": string,
    "phoneNumber": string,
    "username": string
}

export const useUserInfoStore = defineStore("userinfo-store", () => {
    const userinfo = ref<Userinfo>();
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
        userinfo,
        setAuth,
        authFromLocal,
        removeAuth
    };
});
