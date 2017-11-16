import { User } from '../model/user.model';
import { ActionType } from '../action/user.action';
import { TypedAction } from '../utils/typed-action.interface';



export interface State {
		user: User;
}

export const initialState: User = {
				id: '',
				firstName: '',
				lastName: '',
				email: '',
				creatonDate: 0,
				validated: false,
				preferredLanguage: 'EN',
				currentTeamId: '',
				preferences: {},
				trialUser: false,
				hasPaymentSource: false,
				referralCode: '',
				customerId: '',
				referralUrl: ''
};

export function userReducer(state: User = initialState, action: TypedAction<any> ): User {
		switch (action.type) {
				case ActionType.SET_USER:
						return { ...action.payload, pending: false};
				case ActionType.RESET_USER:
						return initialState;
				default:
						return state;
		}
}
