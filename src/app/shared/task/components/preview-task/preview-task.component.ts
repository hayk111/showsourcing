import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Product, ProductConfig, ERM, Contact } from '~models';
import { Observable, ReplaySubject } from 'rxjs';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '~utils';
import { takeUntil, distinctUntilChanged, map, tap, first } from 'rxjs/operators';
import { TaskService } from '~global-services';
import { DialogService } from '~shared/dialog';
import { RfqDialogComponent } from '~features/products/components/rfq-dialog/rfq-dialog.component';
import { Task, Comment } from '~models';
import { NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog';

@Component({
	selector: 'preview-task-app',
	templateUrl: './preview-task.component.html',
	styleUrls: ['./preview-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTaskComponent extends AutoUnsub implements OnInit {
	@Input() task: Task;
  @Output() close = new EventEmitter<any>();
  
  comment$: Observable<Comment>;

	constructor(
		private featureSrv: TaskService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private router: Router) {
		super();
	}

	ngOnInit() {
    
    console.log(this.task);
    
	}

	/** when we receive back the form from the dynamic form component we subscribe to changes to it and
	 * update the product
	 */
	// onFormCreated(form: FormGroup) {
	// 	form.valueChanges
	// 		.pipe(
	// 			takeUntil(this._destroy$),
	// 			distinctUntilChanged()
	// 		).subscribe(product => this.updateProduct(product));
	// }

	// updateProduct(product: any) {
	// 	this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	// }

	// openRfq() {
	// 	// we add manually the supplier self email, since it is not on the contacts
	// 	if (this.contacts && this.product.supplier.officeEmail) {
	// 		this.contacts.push({
	// 			name: this.product.supplier.name || 'Unnamed',
	// 			email: this.product.supplier.officeEmail,
	// 			jobTitle: null
	// 		});
	// 	} else if (!this.contacts && this.product.supplier.officeEmail) {
	// 		this.contacts = [{
	// 			name: this.product.supplier.name || 'Unnamed',
	// 			email: this.product.supplier.officeEmail,
	// 			jobTitle: null
	// 		}];
	// 	}
	// 	this.dlgSrv.openFromModule(RfqDialogComponent, this.module,
	// 		{
	// 			product: this.product,
	// 			contacts: this.contacts
	// 		});
	// }

	// onViewProduct() {
	// 	this.router.navigate(['product', 'details', this.product.id]);
	// }

	// openAddToProject() {
	// 	this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	// }

}
