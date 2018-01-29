

export interface User {
		readonly id: string;
		readonly firstName: string;
		readonly lastName: string;
		readonly email: string;
		readonly creatonDate: number;
		readonly validated: boolean;
		readonly preferredLanguage: string;
		readonly currentTeamId: string;
		readonly preferences: any;
		readonly trialUser: boolean;
		readonly hasPaymentSource: boolean;
		readonly referralCode: string;
		readonly customerId: string;
		readonly referralUrl: string;
		name?: string;
}


