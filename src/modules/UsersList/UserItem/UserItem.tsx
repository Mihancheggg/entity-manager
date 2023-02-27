import React, { ChangeEvent, useEffect, useState } from 'react';
import { FixedUserType, UserType } from '../../../api/UsersApi';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { v1 } from 'uuid';
import { useAppDispatch } from '../../../app/store';
import { updateUserTC } from '../usersReducer';

type UserItemPropsType = {
    user: FixedUserType
    deleteUser: (userId: string) => void
}

export const UserItem = (props: UserItemPropsType) => {
    const {user, deleteUser} = props
    const dispatch = useAppDispatch()

    let [currentUser, setCurrentUser] = useState<FixedUserType>(user)

    useEffect(()=> {
        dispatch(updateUserTC(currentUser))
    },[currentUser])

    const onChangeHandler = (key: string, value: string) => {
        setCurrentUser({...currentUser, [key]: value})
    }

    const onCheckHandler = () => {
        setCurrentUser({...currentUser, access: !currentUser.access})
    }

    return (
        <tr>
            <td>
                <span>{currentUser.id}</span>
            </td>
            <td>
                <EditableSpan value={currentUser.name} onChange={(value: string) => onChangeHandler('name', value)}/>
            </td>
            <td>
                <EditableSpan value={currentUser.lastName} onChange={(value: string) => onChangeHandler('lastName', value)}/>
            </td>
            <td>
               <EditableSpan value={currentUser.email} onChange={(value: string) => onChangeHandler('email', value)}/>
            </td>
            <td>
                <EditableSpan value={currentUser.birthDate} onChange={(value: string) => onChangeHandler('birthDate', value)}/>
            </td>
            <td onClick={onCheckHandler}>
                {currentUser.access.toString()}
            </td>
            <button onClick={() => deleteUser(currentUser.id)}>Delete</button>
        </tr>

    );
};