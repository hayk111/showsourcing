// import { Injectable } from '@angular/core';
// import { ApiService } from '~core/erm3';
// import { Entity } from '~core/erm3/models/_entity.model';
// import gql from 'graphql-tag';
// import { map } from 'rxjs/operators';
// import { of } from 'rxjs';

// // Descriptor Product
// // ==================

// const propertyDescriptor = {
// 	definitionId: '',
// 	defaultValue: JSON.stringify(null),
// 	readonly: false,
// 	required: false,
// };

// // Descriptor Product
// @Injectable({
// 	providedIn: 'root',
// })
// export class DescriptorSeederService {
// 	private _allPropertyTypes = [
// 		'INT',
// 		'FLOAT',
// 		'TEXT',
// 		'TEXTAREA',
// 		'PRICE',
// 		'CHECKBOX',
// 		'COLOR',
// 		'EMAIL',
// 		'TELEPHONE',
// 		'DATE',
// 		'PACKAGING',
// 		'PRICEMATRIX',
// 		'SELECTOR',
// 	];

// 	private _allSelectorTypes = ['SUPPLIER', 'PRODUCT', 'USER', 'SAMPLE', 'TASK', 'CUSTOM'];

// 	// private _selectorSettings = {
// 	// 	type: allSelectorTypes[0],
// 	// 	multiple: false,
// 	// 	canCreate: false,
// 	// 	propertyOptionType: 'CustomType',
// 	// };

// 	constructor(private apiSrv: ApiService) {}

// 	createAllDefinitions() {
// 		this._allPropertyTypes.forEach(propertyType => {
// 			this.createDefinition(`Label ${propertyType}`, `name_${propertyType}`, propertyType);
// 		});
// 	}

// 	listAllDefinitions$ = this.apiSrv.query({
// 			query: gql`
// 				query MyQuery {
// 					__typename
// 					listPropertyDefinitions {
// 						items {
// 							id
// 							label
// 							name
// 							type
// 							selectorSettings {
// 								canCreate
// 								multiple
// 								propertyOptionType
// 								type
// 							}
// 							hint
// 						}
// 					}
// 				}
// 			`,
// 		});

// 	deleteAllDefinitions() {
// 		this.listAllDefinitions$.subscribe((resp: any) => {
// 			const definitions = resp.data.listPropertyDefinitions.items
// 			definitions.forEach(item => this.apiSrv.delete('PropertyDefinition', { id: item.id }));
// 		});
// 	}

// 	createTestDescriptor() {
// 		this.listAllDefinitions$
// 			.pipe(
// 				map((definitions: any) => {
// 					return definitions.map(def => ({
// 						definitionId: def.id,
// 						defaultValue: JSON.stringify(null),
// 						readonly: false,
// 						required: false,
// 					}));
// 				})
// 			)
// 			.subscribe(propertyDescriptor => {
// 				const sectionDescriptor = {
// 					name: 'Product fields section',
// 					properties: [propertyDescriptor],
// 				};
// 				this.createDescriptor([sectionDescriptor], 'PRODUCT', 'test descriptor');
// 			});
// 	}

// 	createDefinition(label, name, propertyType, selectorSettings?, hint = 'hint') {
// 		const propertyDefinition = {
// 			label,
// 			name,
// 			type: propertyType,
// 			selectorSettings,
// 			hint,
// 		};
// 		this.apiSrv.create<Entity>('PropertyDefinition', propertyDefinition as Entity).subscribe();
// 	}

// 	createDescriptor(sections: any[], type, name) {
// 		const productDescriptor = { sections, type, name };
// 		this.apiSrv.create('Descriptor', productDescriptor as Entity).subscribe();
// 	}
// }
