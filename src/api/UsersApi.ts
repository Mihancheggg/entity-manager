import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://retoolapi.dev/eqsQ4S/users/',
    withCredentials: true,
})

export const UsersApi = {
    getUsers() {
        return instance.get<null, AxiosResponse<UserType[]>>('')
            .then(response => response.data)
    }
}

export type UserType = {
    id: string,
    name: string,
    email: string,
    access: boolean,
    lastName: string,
    birthDate: Date
}