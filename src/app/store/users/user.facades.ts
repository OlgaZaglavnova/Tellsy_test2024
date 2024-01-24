import { Injectable } from "@angular/core";
import { IUserState } from "./user.state";
import { Store } from "@ngrx/store";
import { Observable, Subject, of, take } from "rxjs";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { UserActions } from "./user.actions";

@Injectable({
    providedIn: "root",
  })
  export class UserFacade {
    constructor(
      protected store: Store<IUserState>,
      private usersService: UsersService
    ) {}

    //setters
    loadUsers(): void {
      this.usersService.getUsers$().pipe(
        take(1)
      ).subscribe(usersFromService => {
        this.store.dispatch(UserActions.LoadUsers({users: usersFromService}));
      });
    }

    addUser(newUser: User): void {
      this.store.dispatch(UserActions.AddUser({user: newUser}));
    }

    deleteUsers(delUsers: User[]): void {
      this.store.dispatch(UserActions.DeleteUsers({users: delUsers}))
    }

    editUser(eUser: User): void {
      this.store.dispatch(UserActions.EditUser({user: eUser}));
    }

    // getters
    getAllUsers$(): Observable<User[]> {
        return this.store?.select('users') ?? of([]);
    }
  }