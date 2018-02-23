import { targetReducerFactory } from "~store/reducer/target/target.reducer";
import { ActionType } from "./../actions";

export const commentReducer = targetReducerFactory(ActionType)