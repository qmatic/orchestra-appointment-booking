// Action constants and Action creators
import { Action } from "@ngrx/store";
import { IToast } from "../../models/toast.model";

// TOAST ACTIONS
export const ADD_TOAST = "[TOAST] ADD_TOAST";
export const REMOVE_TOAST = "[TOAST] REMOVE_TOAST";
export const REMOVE_FIRST_TOAST = "[TOAST] REMOVE_FIRST_TOAST";

export class AddToast implements Action {
  readonly type = ADD_TOAST;
  constructor(public payload: IToast) {}
}

export class RemoveToast implements Action {
  readonly type = REMOVE_TOAST;
  constructor(public payload: IToast) {}
}

export class RemoveFirstToast implements Action {
  readonly type = REMOVE_FIRST_TOAST;
}

// Action types
export type ToastAction = AddToast | RemoveToast | RemoveFirstToast;
