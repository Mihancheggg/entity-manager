import React from 'react';
import { FixedUserType, UserType } from '../../api/UsersApi';
import styles from './UsersList.module.css'
import { UserItem } from './UserItem/UserItem';
import { FilterType } from '../../app/App';

type UsersListPropsType = {
    users: FixedUserType[],
    updateFilter: (filter: FilterType) => void,
    deleteUser: (userId: string) => void
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
            <thead className={styles.head}>
            <tr>
                {fields.map((el, index) => <td key={index}>
                        <th onClick={() => props.updateFilter(el.type as FilterType)}>
                            {el.name}
                        </th>
                    </td>
                )}
            </tr>
            </thead>
            <tbody>
            {props.users.map(el => <UserItem
                key={el.id}
                user={el}
                deleteUser={props.deleteUser}
            />)}
            </tbody>
        </table>
    );
};