export interface RegisterUserResponse {
    success: boolean,
    message: string,
} 

export interface RegisterUser {
    name: string,
    email: string,
    password: string,
    // profileImage: File | null
}