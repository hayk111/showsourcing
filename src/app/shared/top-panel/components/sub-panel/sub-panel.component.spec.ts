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
import { SubPanelComponent } from './sub-panel.component';
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

	onShowArchived() {}
}

fdescribe('SubPanelComponent', () => {
	let subPanelComponent: SubPanelComponent;
	let testComponent: TestComponent;
	let fixtureTestComponent: ComponentFixture<TestComponent>;
	let dest: DebugElement;
	const subscriptions = new Subscription();

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TopPanelModule],
			declarations: [TestComponent],
			providers: [SubPanelComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixtureTestComponent = TestBed.createComponent(TestComponent);
		testComponent = fixtureTestComponent.componentInstance;
		dest = fixtureTestComponent.debugElement.query(By.directive(SubPanelComponent));
		subPanelComponent = dest.componentInstance;
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

	it('should create TestComponent and SubPanelComponent component', () => {
		expect(testComponent).withContext('Can not create TestComponent').toBeDefined();
		expect(subPanelComponent).withContext('Can not create SubPanelComponent').toBeDefined();
	});

	it('`showArchived` should be called when archive checkbox changed and `isArchivedShown` is true', () => {
		subPanelComponent.isArchivedShown = true;

		spyOn(subPanelComponent.showArchived, 'emit');
		subPanelComponent.archiveChange();
		fixtureTestComponent.detectChanges();

		expect(subPanelComponent.showArchived.emit)
				.withContext('Should call fnc `showArchived`')
				.toHaveBeenCalledTimes(1);
	});

	it('`hideArchived` should be called when archive checkbox changed and `isArchivedShown` is false', () => {
		subPanelComponent.isArchivedShown = false;

		spyOn(subPanelComponent.hideArchived, 'emit');
		subPanelComponent.archiveChange();
		fixtureTestComponent.detectChanges();

		expect(subPanelComponent.hideArchived.emit)
				.withContext('Should call fnc `hideArchived`')
				.toHaveBeenCalledTimes(1);
	});

	it('`showAssigned` should be called when `Assigned To Me` checkbox changed and `isAssigned` is true', () => {
		subPanelComponent.isAssigned = true;

		spyOn(subPanelComponent.showAssigned, 'emit');
		subPanelComponent.assignedChange();
		fixtureTestComponent.detectChanges();

		expect(subPanelComponent.showAssigned.emit)
				.withContext('Should call fnc `showAssigned`')
				.toHaveBeenCalledTimes(1);
	});

	it('`hideAssigned` should be called when `Assigned To Me` checkbox changed and `isAssigned` is false', () => {
		subPanelComponent.isAssigned = false;

		spyOn(subPanelComponent.hideAssigned, 'emit');
		subPanelComponent.assignedChange();
		fixtureTestComponent.detectChanges();

		expect(subPanelComponent.hideAssigned.emit)
				.withContext('Should call fnc `hideAssigned`')
				.toHaveBeenCalledTimes(1);
	});
});
