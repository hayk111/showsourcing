import { AbstractInput } from './abstract-input.class';


// used to link an input to a string that describe it.
export interface InputMap {
	[key: string]: Function;
	default: Function;
}
