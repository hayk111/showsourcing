import { targetReducerFactory } from "~store/reducer/target/target.reducer";
import { ActionType } from "~comment/store/actions";

export const commentReducer = targetReducerFactory(ActionType)