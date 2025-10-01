export interface RegistrationResponse {
    success: boolean,
    message: string,
    user: User,
} 

export interface CheckSessionResponse {
    success: boolean,
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
    name: string,
    email: string,
    profileImage: string | null ,
}


export interface ForgotPasswordResponse {
    message: string,
}

export interface ResetPassword {
    token: string,
    password: string,
}

export interface ChangeRole {
    workspaceId: string,
    memberId: string,
    role?: string,
}