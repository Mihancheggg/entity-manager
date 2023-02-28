import axios, { AxiosResponse } from 'axios'
import { log } from 'util';

const instance = axios.create({
    baseURL: 'https://retoolapi.dev/eqsQ4S/users/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const UsersApi = {
    getUsers() {
        return instance.get<null, AxiosResponse<UserType[]>>('')
            .then(response => response.data)
    },
    deleteUser(userId: string) {
        return instance.delete<string, AxiosResponse<{}>>(`${userId}`)
    },
    addUser(user: FixedUserType) {
        debugger
        return instance.post<FixedUserType, AxiosResponse<any>>(``, {...user})
        /*return fetch('https://retoolapi.dev/eqsQ4S/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })*/
    },
    updateUser(user: FixedUserType){
        return instance.put<FixedUserType,AxiosResponse<any>>(`${user.id}`, user)
    }
}

export type UserType = {
    id: string,
    name?: string,
    email?: string,
    access?: boolean,
    lastName?: string,
    birthDate?: string
}

export type FixedUserType = {
    id: string,
    name: string,
    email: string,
    access: boolean,
    lastName: string,
    birthDate: string
}