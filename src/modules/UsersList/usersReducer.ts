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
        case 'DELETE_USER':
            return {...state, users: state.users.filter(el => el.id !== action.payload.userId)}
        case 'ADD_USER':
            return {...state, users: [...state.users, action.payload.user]}
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.user.id ? {...action.payload.user} : el)
            }
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

export const deleteUserAC = (userId: string) => {
    return {
        type: 'DELETE_USER',
        payload: {
            userId
        }
    } as const
}

export const addUserAC = (user: FixedUserType) => {
    return {
        type: 'ADD_USER',
        payload: {
            user
        }
    } as const
}

export const updateUserAC = (user: FixedUserType) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            user
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
        try {
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
        } catch (e) {
            alert("Users getting error: " + e)
        } finally {

        }

    }
}

export const deleteUserTC = (userId: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        try {
            const response = await UsersApi.deleteUser(userId)
            if (response.status === 200) {
                dispatch(deleteUserAC(userId))
            }
        } catch (e) {
            alert("User deleting error: " + e)
        } finally {

        }
    }
}

export const addUserTC = (user: FixedUserType): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        try {
            const response = await UsersApi.addUser(user)
            dispatch(addUserAC(user))
        } catch (e) {
            alert("User adding error: " + e)
        }
    }
}

export const updateUserTC = (user: FixedUserType): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        try {
            const response = await UsersApi.updateUser(user)
            if (response.status === 200) {
                dispatch(updateUserAC(user))
            }
        } catch (e) {
            alert("User updating error: " + e)
        } finally {

        }
    }
}

type UsersStateType = {
    users: Array<FixedUserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

export type UsersReducerActionTypes =
    SetUsersACType
    | DeleteUserACType
    | AddUserACType
    | UpdateUserACType
    | SetCurrentPageACType

export type SetUsersACType = ReturnType<typeof setUsersAC>
export type DeleteUserACType = ReturnType<typeof deleteUserAC>
export type AddUserACType = ReturnType<typeof addUserAC>
export type UpdateUserACType = ReturnType<typeof updateUserAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>