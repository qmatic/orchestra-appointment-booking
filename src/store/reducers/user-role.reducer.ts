import * as UserRoleActions from '../actions';

export const ADMIN_ROLE = 'ADMIN_ROLE';
export const USER_ROLE = 'USER_ROLE';
export const NO_ROLE = 'NO_ROLE';

export interface IUserRoleState {
    role: string;
    loading: boolean;
    loaded: boolean;
    error: Object;
}

const initialState = {
  role: NO_ROLE,
  loading: false,
  loaded: false,
  error:  null
};


export function reducer(
  state: IUserRoleState = initialState,
  action: UserRoleActions.AllUserRoleActions
): IUserRoleState {
  switch (action.type) {
    case UserRoleActions.FETCH_USER_ROLE_INFO: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case UserRoleActions.FETCH_USER_ROLE_SUCCESS: {
      return {
        ...state,
        role: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case UserRoleActions.FETCH_USER_ROLE_FAIL: {
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
