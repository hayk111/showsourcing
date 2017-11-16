import { Company } from '../model/company.model';
import { ActionType } from '../action/company.action';
import { TypedAction } from '../utils/typed-action.interface';



export const initialState: Company = {
	names: {
			legalName: '',
			tradingName: '',
			brandNames: ''
	},
	address: {
			fullAddress: '',
			city: '',
			zip: '',
			state: '',
			country: ''
	},
	contact: {
			email: '',
			website: '',
			tel: ''
	},
	contacts: [{email: '', function: '' , name: '', tel: ''}],
};

export function companyReducer(state: Company = initialState, action: TypedAction<any> ): Company {
		switch (action.type) {
				case ActionType.SET_COMPANY:
					return { ...action.payload, pending: false};
				case ActionType.ADD_CONTACTS:
					const contacts = [ state.contacts, ...action.payload ];
					return { ...state, contacts };
				default:
						return state;
		}
}
