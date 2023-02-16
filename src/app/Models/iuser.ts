//sign up
export interface IUser {
    userName:        string;
    email:           string;
    password:        string;
    confirmPassword: string;
    role:            string;
}
//response sing up //
export interface Response {
    success: boolean;
    message: null;
    data:    string[];
}
/////log in
export interface LoginInfo{
    userName:   string;
    password:   string;
    rememberMe: boolean;
    returnUrl:  string;
}
/////////////////response log in
export interface ResponseLogin{
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    user:  UserInfo;
    toekn: string;
    roles: string[];
}

export interface UserInfo {
    orderDetails:         null;
    id:                   string;
    userName:             string;
    normalizedUserName:   string;
    email:                string;
    normalizedEmail:      string;
    emailConfirmed:       boolean;
    passwordHash:         string;
    securityStamp:        string;
    concurrencyStamp:     string;
    phoneNumber:          null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled:     boolean;
    lockoutEnd:           null;
    lockoutEnabled:       boolean;
    accessFailedCount:    number;
    firstName:            string;
    lastName:             string;
}
