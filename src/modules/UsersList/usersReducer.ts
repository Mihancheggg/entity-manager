import { FixedUserType, UsersApi, UserType } from '../../api/UsersApi';
import { ThunkDispatchType, ThunkType } from '../../app/store';

const initialState: UsersStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerActionTypes): UsersStateType => {
    switch (action.type) {
        case 'SET_USERS':
            return {...state, users: action.payload.users, totalUsersCount: action.payload.users.length}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.payload.pageNumber}
        default:
            return state
    }
}

export const setUsersAC = (users: Array<FixedUserType>) => {
    return {
        type: 'SET_USERS',
        payload: {
            users
        }
    } as const
}

export const setCurrentPageAC = (pageNumber: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: {
            pageNumber
        }
    } as const
}

export const getUsersTC = (): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        const data = await UsersApi.getUsers()
        const model = {
            id: '',
            name: '',
            email: '',
            access: false,
            lastName: '',
            birthDate: ''
        }
        const fixedData = []
        for (let i = 0; i < data.length; i++) {
            fixedData.push({...model, ...data[i]})
        }
        dispatch(setUsersAC(fixedData))
    }
}

type UsersStateType = {
    users: Array<FixedUserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

export type UsersReducerActionTypes = SetUsersACType | SetCurrentPageACType

export type SetUsersACType = ReturnType<typeof setUsersAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>