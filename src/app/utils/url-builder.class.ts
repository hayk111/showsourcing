
// to easily build api endpoints
export class UrlBuilder {
	private _base: string;
	private _entity: string;
	private _id: string;

	constructor(base: string = 'team', entity?: string) {
		this._base = base;
		this._entity = entity;
	}

	set base(base: 'user' | 'team') {
		this._base = base;
	}

	set entity(entity: string) {
		this._entity = entity;
	}

	set id(id: string) {
		this._id = id;
	}

	getUrl() {
		return `api/${this._base}/${this._id}/${this._entity}`;
	}

	getUrlWithParams(params: string) {
		return this.getUrl() + '?' + params;
	}
}
