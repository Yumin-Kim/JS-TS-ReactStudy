// type APIEndPoint< P extends any[] , R > = () =>Promise<R>


export const USER_DATA = "USER_DATA" as const;
export const USER_UPDATE = "USER_UPDATE" as const;

//fetch user data
export const user = {
    REQUEST:"USER_DATA_REQUEST",
    SUCCESS:"USER_DATA_SUCCESS",
    FAILURE:"USER_DATA_FAILURE",
} as const;

//update user data
export const user_update ={
    REQUEST : "USER_UPDATE_REQUEST",
    SUCCESS : "USER_UPDATE_SUCCESS",
    FAILURE : "USER_UPDATE_FAILURE",
} as const;



