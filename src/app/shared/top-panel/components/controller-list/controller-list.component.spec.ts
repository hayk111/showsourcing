import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	TemplateRef,
	Component,
	ViewChild,
	ViewContainerRef,
	QueryList,
	ContentChildren,
	DebugElement
} from '@angular/core';
import { ControllerListComponent } from './controller-list.component';
import { TopPanelModule } from '../../top-panel.module';
import { By } from '@angular/platform-browser';
import { ColumnDirective } from '~shared/table/components/column.directive';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Sort } from '~shared/table/components/sort.interface';
import { Subscription } from 'rxjs';

class Item {
	name?: string;
	price?: number;
}
@Component({
	template: `
		<sub-panel-app
			[filtersAmount]="filtersAmount"
			[hasFilter]="true"
			[hasSwitch]="true"
			[hasArchived]="hasArchived"
			[hasAssigned]="hasAssigned"
			[hasExport]="hasExport"
			[view]="view"
			[count]="count"
			entityType="products"
			searchType="short"
			[searchValue]="searchValue"
			[ngStyle]="tableWidth && {'width': getSubPanelWidth()}"
			(search)="listSrv.search($event)"
			(clearFilters)="onClearFilters()"
			(showArchived)="onShowArchived()"
			(hideArchived)="onHideArchived()"
			(showAssigned)="onShowAssignee()"
			(hideAssigned)="onHideAssignee()"
			(export)="onExport()"
			(showFilters)="onShowFilters()"
			(viewChange)="onViewChange($event)">
		</sub-panel-app>
	`
})
class TestComponent {
	filtersAmount: number;
	view: 'list' | 'card';
	count: number;
	hasFilter: boolean;
	hasSwitch: boolean;
	currentSort: Sort;
	hasArchived = true;
	hasAssigned = true;
	hasExport = true;

	onShowArchived() { }
}

describe('ControllerListComponent', () => {
	let controllerListComponent: ControllerListComponent;
	let testComponent: TestComponent;
	let fixtureTestComponent: ComponentFixture<TestComponent>;
	let dest: DebugElement;
	const subscriptions = new Subscription();

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TopPanelModule],
			declarations: [TestComponent],
			providers: [ControllerListComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixtureTestComponent = TestBed.createComponent(TestComponent);
		testComponent = fixtureTestComponent.componentInstance;
		dest = fixtureTestComponent.debugElement.query(By.directive(ControllerListComponent));
		controllerListComponent = dest.componentInstance;
		fixtureTestComponent.detectChanges();
	});

	afterEach(async () => {
		if (fixtureTestComponent) {
			await fixtureTestComponent.destroy();
		}

		if (subscriptions) {
			subscriptions.unsubscribe();
		}
	});

	it('should create TestComponent and ControllerListComponent component', () => {
		expect(testComponent).withContext('Can not create TestComponent').toBeDefined();
		expect(controllerListComponent).withContext('Can not create ControllerListComponent').toBeDefined();
	});

	it('`showArchived` should be called when archive checkbox changed and `isArchivedShown` is true', () => {
		controllerListComponent.isArchivedShown = true;

		spyOn(controllerListComponent.showArchived, 'emit');
		controllerListComponent.archiveChange();
		fixtureTestComponent.detectChanges();

		expect(controllerListComponent.showArchived.emit)
			.withContext('Should call fnc `showArchived`')
			.toHaveBeenCalledTimes(1);
	});

	it('`hideArchived` should be called when archive checkbox changed and `isArchivedShown` is false', () => {
		controllerListComponent.isArchivedShown = false;

		spyOn(controllerListComponent.hideArchived, 'emit');
		controllerListComponent.archiveChange();
		fixtureTestComponent.detectChanges();

		expect(controllerListComponent.hideArchived.emit)
			.withContext('Should call fnc `hideArchived`')
			.toHaveBeenCalledTimes(1);
	});

	it('`showAssigned` should be called when `Assigned To Me` checkbox changed and `isAssigned` is true', () => {
		controllerListComponent.isAssigned = true;

		spyOn(controllerListComponent.showAssigned, 'emit');
		controllerListComponent.assignedChange();
		fixtureTestComponent.detectChanges();

		expect(controllerListComponent.showAssigned.emit)
			.withContext('Should call fnc `showAssigned`')
			.toHaveBeenCalledTimes(1);
	});

	it('`hideAssigned` should be called when `Assigned To Me` checkbox changed and `isAssigned` is false', () => {
		controllerListComponent.isAssigned = false;

		spyOn(controllerListComponent.hideAssigned, 'emit');
		controllerListComponent.assignedChange();
		fixtureTestComponent.detectChanges();

		expect(controllerListComponent.hideAssigned.emit)
			.withContext('Should call fnc `hideAssigned`')
			.toHaveBeenCalledTimes(1);
	});

	it('should display "Show Archived" checkbox when `hasArchived` is true and not otherwise', () => {
		let showArchive = fixtureTestComponent.nativeElement.querySelector('.show-archived-container');
		expect(showArchive).toBeTruthy();

		testComponent.hasArchived = false;
		fixtureTestComponent.detectChanges();
		showArchive = fixtureTestComponent.nativeElement.querySelector('.show-archived-container');
		expect(showArchive).toBeFalsy();
	});

	it('should display "Assigned To Me" checkbox when `hasAssigned` is true and not otherwise', () => {
		let showAssigned = fixtureTestComponent.nativeElement.querySelector('.assigned-to-me-container');
		expect(showAssigned).toBeTruthy();

		testComponent.hasAssigned = false;
		fixtureTestComponent.detectChanges();
		showAssigned = fixtureTestComponent.nativeElement.querySelector('.assigned-to-me-container');
		expect(showAssigned).toBeFalsy();
	});

	it('should display "Export" button when `hasExport` is true and not otherwise', () => {
		let exportBtn = fixtureTestComponent.nativeElement.querySelector('.export-button');
		expect(exportBtn).toBeTruthy();

		testComponent.hasExport = false;
		fixtureTestComponent.detectChanges();
		exportBtn = fixtureTestComponent.nativeElement.querySelector('.export-button');
		expect(exportBtn).toBeFalsy();
	});
});
