import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms/models';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Supplier } from '~models';
import { SupplierQueries } from '~features/supplier/services/supplier.queries';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const supplierMutation = gql`
mutation supplier($input: SupplierInput) {
	updateSupplier(input: $input) {
		id
	}
}
`;

const querySupplier = gql`
	subscription supplier($query: String!) {
		suppliers(query: $query) {
			id, name, officeEmail, officePhone, description, generalMOQ, country
			tags {
				id, name
			}
		}
	}
`;

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
	selectedCity;
	cities = [
		{ id: 1, name: 'Vilnius' },
		{ id: 2, name: 'Kaunas' },
		{ id: 3, name: 'Pavilnys' },
		{ id: 4, name: 'Pabradė' },
		{ id: 5, name: 'Klaipėda' }
	];

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', label: 'Name' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' },
		{ name: 'description', type: 'textarea', label: 'description' },
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'tags', type: 'selector', metadata: { subtype: 'tag' }, label: 'tags', multiple: true },
		// { name: 'country', type: 'selector', metadata: { subtype: 'country', isConst: false }, label: 'country' }
	];
	descriptor$;
	supplier$: Observable<Supplier>;
	supplier: Supplier;
	form: FormGroup;
	supplierTest;

	constructor(private apollo: Apollo) { }

	ngOnInit() {
		this.supplier$ = this.apollo.subscribe({
			query: querySupplier,
			variables: { query: 'id = "3243ed5b-4e7b-4646-a858-5e0c41427ccf"' }
		}).pipe(map((r: any) => r.data.suppliers[0]));
		this.supplier$.subscribe(s => this.supplier = s);
		this.descriptor$ = this.supplier$.pipe(
			map(s => new FormDescriptor(this.customFields, s))
		);
	}


	onFormCreated(form: FormGroup) {
		this.form = form;
		form.valueChanges.subscribe(supplier => this.updateSupplier(supplier));
	}

	updateSupplier(supplier) {
		const supplierUpdate = {
			id: this.supplier.id,
			...supplier
		}
		this.apollo.mutate({
			mutation: supplierMutation, variables: {
				input: supplierUpdate
			}
		}).subscribe();
	}
}
