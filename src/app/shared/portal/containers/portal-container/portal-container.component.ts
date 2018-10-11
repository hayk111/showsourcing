import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	HostListener,
	NgModuleRef,
	ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { PortalHostDirective } from '~shared/portal/components/portal-host.directive';
import { PortalService } from '~shared/portal/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'portal-container-app',
	templateUrl: './portal-container.component.html',
	styleUrls: ['./portal-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalContainerComponent extends AutoUnsub implements AfterViewInit {

	// host where we will put dynamically generated components
	@ViewChild(PortalHostDirective) host: PortalHostDirective;
	// view container of said host.
	protected viewContainerRef;
	isOpen = false;

	constructor(
		protected portalSrv: PortalService,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected cdRef: ChangeDetectorRef) {
		super();
	}

	ngAfterViewInit() {
		this.viewContainerRef = this.host.viewContainerRef;
		this.portalSrv.toOpen$
			.pipe(takeUntil(this._destroy$))
			.subscribe(({ component, props, moduleRef }) => {
				this.open(component, moduleRef, props);
			});
		this.portalSrv.toClose$
			.pipe(takeUntil(this._destroy$))
			.subscribe(_ => {
				this.clear();
			});
	}

	/** will put a component in the host container */
	open(component, moduleRef: NgModuleRef<any>, props: any) {
		this.isOpen = true;
		const componentFactoryResolver = moduleRef ?
			moduleRef.componentFactoryResolver :
			this.componentFactoryResolver;
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

		if (instance.ngOnInit) {
			instance.ngOnInit();
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

}
