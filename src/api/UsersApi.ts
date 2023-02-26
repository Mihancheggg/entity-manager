import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://retoolapi.dev/eqsQ4S/users/',
    withCredentials: true,
})

export const UsersApi = {
    getUsers() {
        return instance.get<null, AxiosResponse<UserType[]>>('')
            .then(response => response.data)
    },
    deleteUser(userId: string){
        return instance.delete<string, AxiosResponse<any>>(`${userId}`)
            .then(response=> response)
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