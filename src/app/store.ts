import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { usersReducer, UsersReducerActionTypes } from '../modules/UsersList/usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionsType>
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionsType>

export type AppRootStateType = ReturnType<typeof rootReducer>
export type CommonActionsType = UsersReducerActionTypes
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()