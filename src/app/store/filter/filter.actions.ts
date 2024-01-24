import { createAction, props } from "@ngrx/store";
import { Filter } from "src/app/models/filter.model";

export enum EFilterActions {
    SetFilter = '[Filter] Set filter'
}

export const SetFilter = createAction(
    EFilterActions.SetFilter,
    props<{filter: Filter | null}>()
)