import { Entity } from '../models';

export class Swap {
	constructor(public old: Entity, public replacing: Entity) {}
}
