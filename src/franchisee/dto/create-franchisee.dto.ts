import { UserResponse } from "src/user/type/userResponse";
import { User } from "src/user/user.entity";


export class CreateFranchiseeDto {
    FIO?: string;
    post?: string;
    franchisor_id?: number;
    llc?: string;
    user: UserResponse
}
