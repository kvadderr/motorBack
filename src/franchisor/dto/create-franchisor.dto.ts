import { UserResponse } from "src/user/type/userResponse";
import { User } from "src/user/user.entity";

export class CreateFranchisorDto {
    FIO: string;
    company: string;
    user: UserResponse
}
