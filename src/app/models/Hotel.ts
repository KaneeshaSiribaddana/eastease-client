export interface ApiResponse<T>{
    message?:string;
    data:T;
}

export interface IHotel{
    id:number;
    name:string;
    email:string;
    manager:string;
    phoneNumber:string;
    city:string;
    street:string;
}