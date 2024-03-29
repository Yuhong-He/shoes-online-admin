import { $http } from ".";

export const getUserListApi = (params : {pageSize: number, requestPage: number}) => {
    return $http({
        method: "GET",
        url: "/admin/user/listWithPage",
        params,
    })
}

export const disableOrEnableUserApi = (ids: number[]) => {
    const query = ids.join(",");
    return $http({
        method: "PUT",
        url: `/admin/user/disable/${query}`
    })
}

export const updateUserApi = (id: number, data: {phoneNumber: string; nickName: string}) => {
    return $http({
        method: "PUT",
        url: `/admin/user/${id}`,
        data: data
    })
}
