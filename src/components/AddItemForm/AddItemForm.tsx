import React, { ChangeEvent, useState } from 'react';
import { FixedUserType } from '../../api/UsersApi';
import { v1 } from 'uuid';

type AddItemFormPropsType = {
    addItem: (user: FixedUserType) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [user, setUser] = useState<FixedUserType>({
        id: v1(),
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
        access: false
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.currentTarget.name
        const value = e.currentTarget.value.trim()
        setUser({...user, [key]: value})
    }

    const onCheckHandler = () => {
        setUser({...user, access: !user.access})
    }

    return (
        <form>
            <input type="text" placeholder="Name" name="name" value={user.name} onChange={onChangeHandler}/>
            <input type="text" placeholder="Last name" name="lastName" value={user.lastName} onChange={onChangeHandler}/>
            <input type="text" placeholder="E-mail" name="email" value={user.email} onChange={onChangeHandler}/>
            <input type="date" name="birthDate" value={user.birthDate} onChange={onChangeHandler}/>
            <label htmlFor="access">
                Access:
                <input type="checkbox" name='access' checked={user.access} onChange={onCheckHandler}/>
            </label>
            <button onClick={() =>props.addItem(user)}>Add user</button>
        </form>
    );
};