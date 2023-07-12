import { AxiosResponse } from "axios";
import { UserAuthInfo } from "./auth.interface";

export interface APIResSessionLogin extends AxiosResponse {
    data: {
        data: UserAuthInfo;
        message: string;
        errors: Array<string>;
    };
}
