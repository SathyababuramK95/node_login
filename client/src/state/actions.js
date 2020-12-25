export const CHANGE_USER_LOGIN_STATUS = 'change_Login_Status'
export const STORE_USER_DETAILS= 'store_user_details'





export const changeLoginStatus = (data) => {
    return {
        type : CHANGE_USER_LOGIN_STATUS,
        payload : data
    }
}

export const storeUserDetail = (data) => {
    return {
        type : STORE_USER_DETAILS,
        payload : data
    }
}