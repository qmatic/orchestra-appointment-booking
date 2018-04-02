import { FETCH_USER_FAIL, SET_USER } from './../actions/user';
import { IUser } from './../../models/IUser';


const initialState = {
  "id": "",
  "userName": "",
  "firstName": "",
  "lastName": "",
  "locale": "",
  "direction": "",
  "fullName": ""
}


export function UserReducer(state:IUser = initialState, action) {
  switch (action.type) {
    case SET_USER:
        return { 
            ...action.payload 
        };
    default:
        return state;
    }
}