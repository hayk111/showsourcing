import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms/models';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent {
	test = "lol";
}
