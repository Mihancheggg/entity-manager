import { UsersApi, UserType } from '../../api/UsersApi';
import { ThunkDispatchType, ThunkType } from '../../app/store';

const initialState: UsersStateType = {
    users: []
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerActionTypes): UsersStateType => {
switch (action.type){
    case 'SET_USERS':
        return {...state, users: action.payload.users}
    default:
        return state
}
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: "SET_USERS",
        payload: {
            users
        }
    } as const
}

export const getUsersTC = (): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let data = await UsersApi.getUsers()
        dispatch(setUsersAC(data))
    }
}

type UsersStateType = {
    users: Array<UserType>
}

export type UsersReducerActionTypes = SetUsersACType

export type SetUsersACType = ReturnType<typeof setUsersAC>