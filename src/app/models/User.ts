export interface ApiResponse<T>{
    message?:string;
    data:T;
}

export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}