export interface RegistrationResponse {
    success: boolean,
    message: string,
    user: User,
} 

export interface RegisterUser {
    name: string,
    email: string,
    password: string,
    profileImage: File | null
}

export interface Loginuser {
    credential: string, 
    password: string,
}

export interface User {
    id: string,
    username: string,
    email: string,
    profileImage: string,
}