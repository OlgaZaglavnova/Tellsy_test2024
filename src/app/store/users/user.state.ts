import { Filter } from "src/app/models/filter.model";
import { User } from "src/app/models/user.model";

export interface IUserState {
    users: User[];
    filter: Filter | null;
}

export const initUserState: User[] = [];
