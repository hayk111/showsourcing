import { Entity } from '../store/entity.model';

export class Swap {
	constructor(public old: Entity, public replacing: Entity) { }
}
