import { UserActions } from './user.actions';
import { User } from "src/app/models/user.model";
import { createReducer, on } from "@ngrx/store";

const LoadUsers = (state: User[], loadedUsers: User[]): User[] => {
    return loadedUsers;
};

const AddUser = (state: User[], newUser: User):User[] => {
    const ids = [...state.map(elem => elem.id ? parseInt(elem.id) : 0)];
    const maxId =  ids.length > 0 ? Math.max.apply( Math, ids): 0;
    const newId = maxId + 1;
    const addUser: User = {
        id: newId.toString(),
        ...newUser
    };
    return state? [...state, addUser] : [ addUser ];
};

const DeleteUser = (state: User[], delUser: User): User[] => {
    return [...state.filter(user => user.id !== delUser.id)];
};

const DeleteUsers = (state: User[], delUsers: User[]): User[] => {
    const stateUsers = [...state];
    const delIds = delUsers.map(elem => elem.id);
    const deletedUsers = [];
    for (let dUser of stateUsers) {
        if (!delIds.includes(dUser.id)) {
            deletedUsers.push(dUser);
        }
    }
    return deletedUsers;
};

const EditUser = (state: User[], editedUser: User): User[] => {
    const stateUsers = [...state];
    const editedUsers = [];
    for (let eUser of stateUsers) {
        if (eUser.id == editedUser.id) {
            editedUsers.push(editedUser);
        } else {
            editedUsers.push(eUser);
        }
    }
    return editedUsers;
};


export const usersReducer = createReducer<User[]>(
    [] ,
    on(UserActions.LoadUsers, (state, action) => LoadUsers(state, action.users)),
    on(UserActions.AddUser, (state, action) => AddUser(state, action.user)),
    on(UserActions.DeleteUser, (state, action) => DeleteUser(state, action.user)),
    on(UserActions.DeleteUsers, (state, action) => DeleteUsers(state, action.users)),
    on(UserActions.EditUser, (state, action) => EditUser(state, action.user)),
)
