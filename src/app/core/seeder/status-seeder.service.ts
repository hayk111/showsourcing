import { ApiService } from '~core/erm3';
import { Entity } from '~core/erm3/models/_entity.model';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// Descriptor Product
@Injectable({
	providedIn: 'root',
})
export class StatusSeederService {
	private _categoryTypes = {
		NEW: 'NEW',
		INPROGRESS: 'INPROGRESS',
		VALIDATED: 'VALIDATED',
		REFUSED: 'REFUSED',
	};

	private _steps = {
		PRODUCT: [
			'New product',
			'Get quotation',
			'Validate sample',
			'Team review',
			'Validated',
			'Refused',
		],
		SUPPLIER: ['New supplier', 'Onboarding', 'Validated', 'Refused'],
		// TASK: [],
		SAMPLE: [
			'New sample',
			'To order',
			'Ordered',
			'Received',
			'Under assessment',
			'Validated',
			'Refused',
		],
	};

	constructor(private apiSrv: ApiService) {}

	async listStatuses(): Promise<any> {
		return this.apiSrv.listBy('WorkflowStatus').data$.pipe(first()).toPromise();
	}

	/** delete all WorkflowStatus in current team */
	async deleteAllStatuses(): Promise<any> {
		const allStatuses: any = await this.listStatuses();
		return await this.apiSrv.deleteMany('WorkflowStatus', allStatuses).pipe(first()).toPromise();
	}

	async createAllStatus(): Promise<any> {
		const allPromises = [];
		Object.entries(this._steps).reduce((accPromises, [type, stepNames]) => {
			const promises = stepNames.map((stepName, i) => {
				const newStatus = {
					name: stepName,
					inWorkflow: true,
					category: this._categoryTypes.INPROGRESS,
					step: i + 1,
					final: false,
					type: type,
				};
				// the first name is "new ..."
				if (i === 0) newStatus.category = this._categoryTypes.NEW;
				// the before last name is "Valided"
				if (i === stepNames.length - 2) {
					newStatus.category = this._categoryTypes.VALIDATED;
					newStatus.final = true;
				}
				// the last name is "Refused"
				if (i === stepNames.length - 1) newStatus.category = this._categoryTypes.REFUSED;
				return this.apiSrv.create('WorkflowStatus', newStatus as Entity).pipe(first()).toPromise();
			});
			return [...accPromises, ...promises];
		}, allPromises);
		return await Promise.all(allPromises);
	}

}
