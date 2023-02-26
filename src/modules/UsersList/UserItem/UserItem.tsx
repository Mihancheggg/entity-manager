import React from 'react';
import { FixedUserType, UserType } from '../../../api/UsersApi';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';

type UserItemPropsType = {
    user: FixedUserType
    deleteUser: (userId: string) => void
}

export const UserItem = (props: UserItemPropsType) => {
    const {user, deleteUser} = props
    return (
        <tr>
            <td>
                <span>{user.id}</span>
            </td>
            <td>
                <EditableSpan value={user.name} onChange={()=> {}}/>
            </td>
            <td>
                <EditableSpan value={user.lastName} onChange={()=> {}}/>
            </td>
            <td>
               <EditableSpan value={user.email} onChange={()=> {}}/>
            </td>
            <td>
                <EditableSpan value={user.birthDate} onChange={()=> {}}/>
            </td>
            <td>
                {user.access.toString()}
            </td>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
        </tr>

    );
};