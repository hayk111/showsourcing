import { targetReducerFactory } from "~store/reducer/target/target.reducer";
import { ActionType } from "~comment";

export const commentReducer = targetReducerFactory(ActionType)