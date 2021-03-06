import { RootUnion } from '~/actions/root.actions';
import { RootTypes } from '~/types/root.types';
import { ResetPasswordActionsUnion } from './actions';
import { ResetPasswordTypes } from './types';

export interface ResetPasswordState {
    error?;
}

const INITIAL_STATE: ResetPasswordState = {};

export function resetPasswordReducer(state = INITIAL_STATE, action: ResetPasswordActionsUnion | RootUnion): ResetPasswordState {

    switch (action.type) {

        case ResetPasswordTypes.RESET_PASSWORD_REQUEST: return INITIAL_STATE;
        case ResetPasswordTypes.RESET_PASSWORD_ERROR: return { error: { ...action.error } };
        case ResetPasswordTypes.RESET_ERROR: return { error: null };
        case RootTypes.RESET: return INITIAL_STATE;
        default: return state;
    }
}