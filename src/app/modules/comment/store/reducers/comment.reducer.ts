import { targetReducerFactory } from "@store/reducer/target/target.reducer";
import { ActionType } from "@modules/comment";

export const commentReducer = targetReducerFactory(ActionType)