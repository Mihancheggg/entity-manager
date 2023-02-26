import React from 'react';
import { UserType } from '../../../api/UsersApi';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';

export const UserItem = (props: UserType) => {
    return (
        <tr>
            <td>
                <EditableSpan value={props.id} onChange={() => {
                }}/>
            </td>
            <td>
                {props.name && <EditableSpan value={props.name} onChange={()=> {}}/>}
            </td>
            <td>
                {props.lastName && <EditableSpan value={props.lastName} onChange={()=> {}}/>}
            </td>
            <td>
                {props.email && <EditableSpan value={props.email} onChange={()=> {}}/>}
            </td>
            <td>
                {props.birthDate && <EditableSpan value={props.birthDate} onChange={()=> {}}/>}
            </td>
            <td>
                {props.access && props.access.toString()}
            </td>
        </tr>

    );
};