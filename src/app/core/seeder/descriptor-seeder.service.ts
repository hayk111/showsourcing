import { Injectable } from '@angular/core';
import { ApiService } from '~core/erm3';
import { Entity } from '~core/erm3/models/_entity.model';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { uuid } from '../../utils';

// Descriptor Product
@Injectable({
	providedIn: 'root',
})
export class DescriptorSeederService {
	private _allPropertyTypes = [
		'INT',
		'FLOAT',
		'TEXT',
		'TEXTAREA',
		'PRICE',
		'CHECKBOX',
		'COLOR',
		'EMAIL',
		'TELEPHONE',
		'DATE',
		'PACKAGING',
		'PRICEMATRIX',
		'SELECTOR',
	];

	private _allSelectorTypes = ['SUPPLIER', 'PRODUCT', 'USER', 'SAMPLE', 'TASK', 'CUSTOM'];

	constructor(private apiSrv: ApiService) {}

	async createAllTypesDefinitions() {
		console.log('CREATE ALL CALLED');
		const propertyDefinitions = this._allPropertyTypes.map(propertyType =>
			this._createDefinition(`Label ${propertyType}`, `name_${propertyType}`, propertyType)
		);
		return await Promise.all(propertyDefinitions);
	}

	listAllDefinitions$ = this.apiSrv.query({
		query: gql`
			query MyQuery($limit: Int, $filter: ModelPropertyDefinitionFilterInput) {
				listPropertyDefinitions(limit: $limit, filter: $filter) {
					items {
						id
						label
						name
						type
						selectorSettings {
							canCreate
							multiple
							propertyOptionType
							type
						}
						hint
						deleted
					}
				}
			}
		`,
		variables: { limit: 1000, filter: { deleted: { ne: true } }, fetchPolicy: 'network-only' },
	}).data$;

// 	listDescriptors$ = this.apiSrv.query({
// 		query: gql`
// query MyQuery {
//   listDescriptorsByType(type: {eq: "PRODUCT"}, teamId: "b6807f62-d7ae-4a7d-bc82-0d689e179581") {
//     items {
//       sections {
//         properties {
//           id
//           defaultValue
//           required
//           readonly
//           definition {
//             id
//             label
//             name
//             type
//             hint
//           }
//         }
// 				name
//       }
//     }
//   }
// }

// 		`,
// 	}).data$;

	async deleteAllDefinitions() {
		const definitions: any = await this.listAllDefinitions$.pipe(first()).toPromise();
		// .subscribe((definitions: any) => {
		// const definitions = resp.data.listPropertyDefinitions.items;
		definitions.map(item =>
			this.apiSrv.delete('PropertyDefinition', { id: item.id }).pipe(first()).toPromise()
		);
		return await Promise.all(definitions);
		// });
	}

	async createAllTypesDefDescriptor() {
		// list of propertyDefinitions
		const definitions: any = await this.createAllTypesDefinitions();

		// list of propertyDescryptors
		const propertyDescriptor = definitions.map(def => ({
			definitionId: def.id,
			defaultValue: JSON.stringify(null),
			readonly: false,
			required: false,
			id: uuid()
		}));

		// single sectionDescriptor
		const sectionDescriptor = {
			name: 'Product fields section',
			properties: propertyDescriptor,
		};

		// creation new descriptor
		return await this._createDescriptor([sectionDescriptor], 'PRODUCT', 'test descriptor');
	}

	private _createDefinition(
		label,
		name,
		propertyType,
		selectorSettings?,
		hint = 'hint'
	): Promise<any> {
		const propertyDefinition = {
			label,
			name,
			type: propertyType,
			selectorSettings,
			hint,
		};
		return this.apiSrv
			.create<Entity>('PropertyDefinition', propertyDefinition as Entity)
			.pipe(first())
			.toPromise();
	}

	private _createDescriptor(sections: any[], type, name): Promise<any> {
		const productDescriptor = { sections, type, name };
		return this.apiSrv.create('Descriptor', productDescriptor as Entity).pipe(first()).toPromise();
	}
}
