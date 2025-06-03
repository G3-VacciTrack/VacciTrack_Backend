export type UserRequest = {
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    token: string;
    verify: boolean;
}

export type UserResponse = {
    fistName: string;
    lastName: string;
    dob: string;
    age: number;
    gender: string;
}