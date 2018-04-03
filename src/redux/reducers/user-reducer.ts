import * as userActions from './../actions/user';
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
    case userActions.FETCH_USER_SUCCESS:
        return { 
            ...action.payload 
        };
    default:
        return state;
    }
}