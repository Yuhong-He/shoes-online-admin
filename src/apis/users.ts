import { $http } from ".";

export const getUserListApi = (params : {pageSize: number, requestPage: number}) => {
    return $http({
        method: "GET",
        url: "/admin/user/listWithPage",
        params,
    })
}
