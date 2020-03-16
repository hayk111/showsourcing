import { Typename } from './typename.type';

interface EMConfig {
	typename: Typename;
}

// short for entitymetada
class EM {
	typename: Typename;
	destUrl: string;
	constructor({ typename }: EMConfig) {
		this.typename = typename;
		this.destUrl = typename.toLocaleLowerCase() + 's';
	}

}

// short for entity-metadata-map
export const entityMetadatas: Partial<Record<Typename, any>> = {
	Product:  new EM({ typename: 'Product' })
};
