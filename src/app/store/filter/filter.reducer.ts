import { createReducer, on } from "@ngrx/store";
import { Filter } from "src/app/models/filter.model";
import { SetFilter } from "./filter.actions";

const filterInitState: Filter | null = null;

const SetFilterR = (state: Filter | null, newFilter: Filter | null): Filter | null => newFilter;

export const filterReducer = createReducer<Filter | null>(
    filterInitState,
    on(SetFilter, (state, action) => SetFilterR(state, action.filter))
);