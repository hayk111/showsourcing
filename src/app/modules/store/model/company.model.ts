
export interface Company {
	readonly names: CompanyNames;
	readonly address: Address;
	readonly contact: CompanyContact;
	readonly contacts: Array<CompanyPersonContact>;

}

export interface CompanyNames {
	readonly legalName: string;
	readonly tradingName: string;
	readonly brandNames: string;
}

export interface Address {
	readonly fullAddress: string;
	readonly city: string;
	readonly zip: string;
	readonly state: string;
	readonly country: string;
}

export interface CompanyContact {
	readonly website: string;
	readonly tel: string;
	readonly email: string;
}

export interface CompanyPersonContact {
	readonly name: string;
	readonly function: string;
	readonly tel: string;
	readonly email: string;
}
