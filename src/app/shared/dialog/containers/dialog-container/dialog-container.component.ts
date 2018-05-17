import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ViewChild,
	HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~app/app-root/utils';

import { DialogHostDirective } from '../../components/dialog-host.directive';
import { dialogComponentMap } from '../../models/dialog-component-map.const';
import { DialogName } from '../../models/dialog-names.enum';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from '~app/shared/dialog/services/dialog.service';


@Component({
	selector: 'dialog-container-app',
	templateUrl: './dialog-container.component.html',
	styleUrls: ['./dialog-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainerComponent extends AutoUnsub implements AfterViewInit {
	// host where we will put dynamically generated components
	@ViewChild(DialogHostDirective) host: DialogHostDirective;
	// view container of said host.
	protected viewContainerRef;
	// currently displayed dialog if any
	protected currentDialog: DialogName;
	isOpen = false;

	constructor(
		protected srv: DialogService,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected cdRef: ChangeDetectorRef) {
		super();
	}

	ngAfterViewInit() {
		this.viewContainerRef = this.host.viewContainerRef;
		this.srv.toOpen$
			.pipe(takeUntil(this._destroy$))
			.subscribe(({ name, props }) => {
				this.open(name, props);
			});
		this.srv.toClose$
			.pipe(takeUntil(this._destroy$))
			.subscribe(name => {
				this.clear();
			});
	}

	/** will put a component in the host container */
	open(name: DialogName, props: any) {
		this.isOpen = true;
		this.currentDialog = name;
		const component = this.getComponent(name);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		this.viewContainerRef.clear();

		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		// adding properties to dialog
		if (props) {
			Object.keys(props).forEach(key => {
				(<any>componentRef.instance)[key] = props[key];
			});
		}

		// mark for cd since we use the store and the event happened somewhere else
		this.cdRef.markForCheck();
	}

	@HostListener('document:keydown.escape', ['$event'])
	close() {
		this.clear();
	}

	/** removes component from host */
	clear() {
		if (this.isOpen) {
			this.viewContainerRef.clear();
			this.isOpen = false;
			this.cdRef.markForCheck();
		}
	}

	/** gets the component given a component name, throws error if not found */
	getComponent(name: DialogName) {
		const component = dialogComponentMap[name];

		if (!component)
			throw Error(`the component with name ${name} wasn't found in the dialog component map. Please put it there in order to make it work.`);

		return component;
	}


}
