import { IUserState } from './user-reducer';
import * as userActions from './../actions/user';
import { IUser } from './../../models/IUser';

export interface IUserState {
    data: IUser,
    loaded: boolean,
    error: Object
}

const initialState = {
  data: {
        id: "",
        userName: "",
        firstName: "",
        lastName: "",
        locale: "",
        direction: "",
        fullName: ""
    },
    loaded: false,
    error:  null
}


export function UserReducer(state:IUserState = initialState, action: userActions.UserAction) {
  switch (action.type) {
    case userActions.FETCH_USER_SUCCESS:
        return { 
            ...state,
            data: {
                ...action.payload
            },
            loaded: true,
            error: null
        };
    case userActions.FETCH_USER_FAIL:
        return { 
            ...state,
            data: {
                ...state.data
            },
            loaded: true,
            error: {
                ...action.payload
            }
        };
    default:
        return state;
    }
}