import React, { useState } from 'react';
import { FixedUserType } from '../../../api/UsersApi';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { useAppDispatch } from '../../../app/store';
import { updateUserTC } from '../usersReducer';
import styles from './UserItem.module.css'

type UserItemPropsType = {
    user: FixedUserType
    deleteUser: (userId: string) => void
}

export const UserItem = (props: UserItemPropsType) => {
    const {user, deleteUser} = props
    const dispatch = useAppDispatch()

    let [currentUser, setCurrentUser] = useState<FixedUserType>(user)
    let [editMode, setEditMode] = useState(false);

    const onChangeHandler = (key: string, value: string) => {
        setCurrentUser({...currentUser, [key]: value})
    }

    const onCheckHandler = () => {
        setCurrentUser({...currentUser, access: !currentUser.access})
    }

    const onSaveHandler = () => {
        dispatch(updateUserTC(currentUser))
        setEditMode(false)
    }

    return (
        <tr className={styles.row }>
            <td>
                <span>{currentUser.id}</span>
            </td>
            <td>
                <EditableSpan value={currentUser.name} onChange={(value: string) => onChangeHandler('name', value)}
                              editMode={editMode} setEditMode={setEditMode}/>
            </td>
            <td>
                <EditableSpan value={currentUser.lastName}
                              onChange={(value: string) => onChangeHandler('lastName', value)} editMode={editMode}
                              setEditMode={setEditMode}/>
            </td>
            <td>
                <EditableSpan value={currentUser.email} onChange={(value: string) => onChangeHandler('email', value)}
                              editMode={editMode} setEditMode={setEditMode}/>
            </td>
            <td>
                <EditableSpan value={currentUser.birthDate}
                              onChange={(value: string) => onChangeHandler('birthDate', value)} editMode={editMode}
                              setEditMode={setEditMode}/>
            </td>
            {editMode ?
                <td onClick={onCheckHandler} className={styles.edited} style={{background:'white'}}>
                    {currentUser.access.toString()}
                </td>
                :
                <td>
                    {currentUser.access.toString()}
                </td>}
            <button disabled={!editMode} onClick={onSaveHandler}>Save</button>
            <button onClick={() => deleteUser(currentUser.id)}>Delete</button>
        </tr>

    );
};