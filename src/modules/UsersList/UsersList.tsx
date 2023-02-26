import React from 'react';
import { UserType } from '../../api/UsersApi';
import styles from './UsersList.module.css'
import { UserItem } from './UserItem/UserItem';
import { FilterType } from '../../app/App';

type UsersListPropsType = {
    users: UserType[],
    callback: (filter: FilterType) => void
}

export const UsersList = (props: UsersListPropsType) => {
    const fields = [
        {name: "ID", type: 'id'},
        {name: "Name", type: 'name'},
        {name: "Last name", type: 'lastName'},
        {name: "E-mail", type: 'email'},
        {name: "Birth date", type: 'birthDate'},
        {name: "Access", type: 'access'}
    ]

    return (
        <table className={styles.list}>
            <thead>
            <tr>
                {fields.map((el, index) => <td key={index}>
                        <th onClick={() => props.callback(el.type as FilterType)}>
                            {el.name}
                        </th>
                    </td>
                )}
            </tr>
            </thead>
            <tbody>
            {props.users.map(el => <UserItem
                key={el.id}
                id={el.id}
                name={el.name}
                lastName={el.lastName}
                email={el.email}
                access={el.access}
                birthDate={el.birthDate}
            />)}
            </tbody>
        </table>
    );
};