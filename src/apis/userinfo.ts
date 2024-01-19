import { $http } from ".";

export const getUserinfoApi = () => {
    return $http({
        method: "GET",
        url: "/user/info"
    })
}
