import { $http } from ".";

export const getMarketingApi = () => {
    return $http({
        method: "GET",
        url: "/admin/stat/marketing"
    })
}
export const getAchievementApi = () => {
    return $http({
        method: "GET",
        url: "/admin/stat/achievement"
    })
}
export const getOrderApi = () => {
    return $http({
        method: "GET",
        url: "/admin/stat/order"
    })
}
