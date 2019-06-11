import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	HostListener,
	ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DialogHostDirective } from '~shared/dialog/components/dialog-host.directive';
import { DialogService } from '~shared/dialog/services/dialog.service';
import { AutoUnsub } from '~utils';


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
	/** whether clicking */
	closeOnOutsideClick = true;
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
			.subscribe(({ component, props, closeOnOutsideClick }) => {
				this.open(component, props, closeOnOutsideClick);
			});
		this.srv.toClose$
			.pipe(takeUntil(this._destroy$))
			.subscribe(_ => this.clear());
	}

	/** will put a component in the host container */
	open(component, props: any, closeOnOutsideClick = true) {
		this.isOpen = true;
		this.closeOnOutsideClick = closeOnOutsideClick;
		const componentFactoryResolver = this.componentFactoryResolver;
		const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
		this.viewContainerRef.clear();
		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		const instance = (<any>componentRef.instance);
		// adding properties to dialog
		if (props) {
			Object.keys(props).forEach(key => {
				instance[key] = props[key];
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

	closeIfNeeded() {
		if (this.closeOnOutsideClick) {
			this.close();
		}
	}

}
