import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IUserState } from "../users/user.state";
import { Filter } from "src/app/models/filter.model";
import { SetFilter } from "./filter.actions";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  export class FilterFacade {
    constructor(
      protected store: Store<IUserState>,
    ) {}

    //setters
    setFilter(filter: Filter | null): void {
        this.store.dispatch(SetFilter({ filter }));
    }

    // getters
    getFilter$(): Observable<Filter | null> {
        return this.store?.select('filter');
    }
  }