import { Action } from '@ngrx/store';
import { Company, CompanyContact } from '../model/company.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_COMPANY = '[Company] setting',
		ADD_CONTACTS = '[Company] add contacts'
}

export class CompanyActions {
		static setCompany(payload: Company): TypedAction<Company> {
			return {
					type: ActionType.SET_COMPANY,
					payload
			};
		}

		static addContacts(payload: Array<CompanyContact>) {
			return {
				type: ActionType.ADD_CONTACTS,
				payload
			};
		}
}
