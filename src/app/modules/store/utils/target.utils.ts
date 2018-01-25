import { EntityTarget } from './entities.utils';


export interface AddTarget<G> {
	target: EntityTarget;
	added: Array<G>;
}

export interface ReplaceTarget<G> {
	target: EntityTarget;
	old: G;
	replacing: G;
}
