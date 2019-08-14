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
class TestComponent extends SubPanelComponent {
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

	it('FilterBtnListComponent\'s isArchived should return true when showArchived() is called', () => {
		testComponent.isArchivedShown = true;

		spyOn(subPanelComponent, 'archiveChange');
		subPanelComponent.archiveChange();
		fixtureTestComponent.detectChanges();

		subscriptions.add(subPanelComponent.showArchived.subscribe(res =>
			expect(res)
				.withContext('Input "unselectOne" should be emitted')
				.toBe(5)));

		expect(subPanelComponent.archiveChange)
				.withContext('Should call fnc "showArchived"')
				.toHaveBeenCalled();
	});
});
