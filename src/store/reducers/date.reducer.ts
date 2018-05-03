import * as DateActions from '../actions';

export interface IDatesState {
  dates: string[];
  selectedDate: string;
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IDatesState = {
  dates: [],
  selectedDate: null,
  searchText: '',
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IDatesState = initialState,
  action: DateActions.AllDateActions
): IDatesState {
  switch (action.type) {
    case DateActions.FETCH_DATES: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case DateActions.FETCH_DATES_SUCCESS: {
      return {
        ...state,
        dates: action.payload.dates,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case DateActions.FETCH_DATES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case DateActions.RESET_DATES: {
      return {
        ...state,
        dates: [],
        loaded: false,
        error: null
      };
    }
    case DateActions.SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      };
    }
    case DateActions.DESELECT_DATE: {
      return {
        ...state,
        selectedDate: null
      };
    }
    case DateActions.FILTER_DATES: {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case DateActions.RESET_FILTER_DATES: {
      return {
        ...state,
        searchText: ''
      };
    }
    default: {
      return state;
    }
  }
}
