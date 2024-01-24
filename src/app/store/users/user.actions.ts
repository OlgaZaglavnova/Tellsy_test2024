import { createAction, props, union } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export enum EUserActions {
    LoadUsers = '[Users] Load users from service',
    GetUsers = '[Users] Get all users',
    GetUsersSuccess = '[Users] Get all users - success',
    AddUser = '[Users] Add user',
    AddUserSuccess = '[Users] Add user - success',
    DeleteUser = '[Users] Delete user',
    DeleteUserSuccess = '[Users] Delete user success',
    DeleteUsers = '[Users] Delete users',
    EditUser = '[Users] Edit user',
    EditUserSuccess = '[Users] Edit user success'
}

const LoadUsers = createAction(
    EUserActions.LoadUsers,
    props<{users: User[]}>()
);

const GetUsers = createAction(
    EUserActions.GetUsers,
    props<{users: User[]}>()
);

const AddUser = createAction(
    EUserActions.AddUser,
    props<{user: User}>()
);

const AddUserSuccess = createAction(
    EUserActions.AddUserSuccess,
    props<{success: boolean}>()
);

const DeleteUser = createAction(
    EUserActions.DeleteUser,
    props<{user: User}>()
);

const DeleteUserSuccess = createAction(
    EUserActions.DeleteUserSuccess,
    props<{success: boolean}>()
);

const DeleteUsers = createAction(
    EUserActions.DeleteUsers,
    props<{users: User[]}>()
);

const EditUser = createAction(
    EUserActions.EditUser,
    props<{user: User}>()
);

const EditUserSuccess = createAction(
    EUserActions.EditUserSuccess,
    props<{success: boolean}>()
);

export const UserActions = {
    LoadUsers,
    GetUsers,
    AddUser,
    AddUserSuccess,
    DeleteUser,
    DeleteUserSuccess,
    DeleteUsers,
    EditUser,
    EditUserSuccess
};

const all = union(UserActions);

export type UsersActionsTypes = typeof all;