import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
// import { EUserActions, UserActions } from "./user.actions";

@Injectable({ providedIn: "root" })
export class UserEffects {

    constructor(
        private actions$: Actions
    ) {}
}