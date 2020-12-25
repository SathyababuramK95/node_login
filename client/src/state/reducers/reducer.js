import { CHANGE_USER_LOGIN_STATUS } from '../actions';
import { STORE_USER_DETAILS } from '../actions';


const initialState  = {
    isUserLoggedin : false,
    userData : {}
};

const reducer = (state = initialState,action) => {
    if(action.type === CHANGE_USER_LOGIN_STATUS){
        state = Object.assign({},state, {isUserLoggedin : action.payload })
    }
    if(action.type === STORE_USER_DETAILS){
        state = Object.assign({},state, {userData : action.payload })
    }

    return state;
}

export default reducer;