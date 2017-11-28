import { Component, OnInit, Input } from '@angular/core';
import { DialogNames } from '../../../../shared/dialog/dialogs.enum';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { FormBuilderService } from '../../../../shared/form-builder/services/form-builder.service';
import { FormGroupDescriptor } from '../../../../shared/form-builder/interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../../../shared/form-builder/interfaces/form-descriptor.interface';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
	dlgName = DialogNames.PRODUCT;
	@Input() product;
	formDescriptor$: Observable<FormDescriptor>;

	constructor(private store: Store<any>, private formBuilderSrv: FormBuilderService) {}

	ngOnInit() {
		this.formDescriptor$ = this.store.select(dotSelector('customFields.productsCFDef'))
		.filter( r => r);
	}

}
