
import { IUser } from './../../models/IUser';
import * as UserActions from '../actions';

export interface IUserState {
    data: IUser;
    loading: boolean;
    loaded: boolean;
    error: Object;
}

const initialState = {
  data: {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    locale: '',
    direction: '',
    fullName: ''
  },
  loading: false,
  loaded: false,
  error:  null
};


export function reducer(
  state: IUserState = initialState,
  action: UserActions.AllUserActions
): IUserState {
  switch (action.type) {
    case UserActions.FETCH_USER_INFO: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case UserActions.FETCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        data: {
            ...action.payload
        },
        loading: false,
        loaded: true,
        error: null
      };
    }
    case UserActions.FETCH_USER_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
            ...action.payload
        }
      };
    }
    default: {
        return state;
    }
  }
}
