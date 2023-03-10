import React, { useEffect, useState } from 'react';
import './App.css';
import { UsersList } from '../modules/UsersList/UsersList';
import { AddItemForm } from '../components/AddItemForm/AddItemForm';
import { Paginator } from '../components/Paginator/Paginator';
import { useAppDispatch, useAppSelector } from './store';
import { addUserTC, deleteUserTC, getUsersTC, setCurrentPageAC } from '../modules/UsersList/usersReducer';
import { FixedUserType } from '../api/UsersApi';

export type FilterType = 'id' | 'name' | 'email' | 'access' | 'lastName' | 'birthDate'

function App() {
    const dispatch = useAppDispatch()

    const [filterValue, setFilterValue] = useState<FilterType>('id')

    useEffect(() => {
        dispatch(getUsersTC())
    }, [dispatch])

    const {
        users,
        pageSize,
        totalUsersCount,
        currentPage,
        isFetching
    } = useAppSelector(state => state.users)

    let sortedUsers = [...users];
    if (filterValue !== null) {
        sortedUsers.sort((a, b) => {
            if (!a[filterValue]) {
                return 1
            }
            if (!b[filterValue]) {
                return -1
            }
            if (a[filterValue] < b[filterValue]) {
                return -1;
            }
            if (a[filterValue] > b[filterValue]) {
                return 1;
            }
            return 0;
        });
    }

    const usersToShow = sortedUsers.slice((currentPage * pageSize - 10), currentPage * pageSize)

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }

    const deleteUser = (userId: string) => {
        dispatch(deleteUserTC(userId))
    }

    const addItem = (user: FixedUserType) => {
        dispatch(addUserTC(user))
    }

    return (
        <div className="App">
            {isFetching && <h3>Loading...</h3>}
            <AddItemForm addItem={addItem}/>
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                portionSize={10}
                onPageChanged={onPageChanged}
            />
            <UsersList
                users={usersToShow}
                updateFilter={setFilterValue}
                deleteUser={deleteUser}
            />
        </div>
    );
}

export default App;
