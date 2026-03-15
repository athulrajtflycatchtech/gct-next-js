export interface LoginResult {
    refresh: string;
    access:  string;
    role:    string;
    user_id :number;
    full_name : string;
}

export interface LoginResponse{
    message:string;
    results:LoginResult
}