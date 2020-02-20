import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
	TemplateRef,
	Component,
	ViewChild,
	ViewContainerRef,
	QueryList,
	ContentChildren,
	DebugElement
} from "@angular/core";
import { TableComponent } from "./table.component";
import { TableModule } from "../../table.module";
import { By } from "@angular/platform-browser";
import { ColumnDirective } from "~shared/table/components/column.directive";
import { EntityTableComponent } from "~common/tables/entity-table.component";
import { Sort } from "~shared/table/components/sort.interface";
import { Subscription } from "rxjs";

class Item {
	name?: string;
	price?: number;
}
@Component({
	template: `
		<ng-template #contextualMenuTemplate let-row="row">
			{{ row?.name }}
		</ng-template>

		<table-app
			#table
			[rows]="rows"
			[pending]="pending"
			[hasSelection]="hasSelection"
			[selected]="selection"
			[contextualMenu]="contextualMenuTemplate"
			[hasPagination]="hasPagination"
			[count]="count"
			placeholder="'No items'"
			(next)="next.emit()"
			(previous)="previous.emit()"
			(goToPage)="goToPage.emit($event)"
			(selectOne)="select.emit($event)"
			(unselectOne)="unselect.emit($event)"
			(selectAll)="selectAll.emit($event)"
			(unselectAll)="unselectAll.emit($event)"
			(bottomReached)="bottomReached.emit()"
			(sort)="sort.emit($event)"
			[currentSort]="currentSort"
		>
			<!-- name -->
			<ng-template
				[columnApp]="'Item name'"
				sortBy="name"
				let-row="row"
				width="300"
			>
				{{ row?.name }}
			</ng-template>

			<!-- price -->
			<ng-template
				[columnApp]="'Price'"
				sortBy="price"
				let-row="row"
				width="300"
			>
				{{ row?.price }}
			</ng-template>
		</table-app>
	`
})
class TestComponent extends EntityTableComponent<Item> {
	@ViewChild("contextualMenu", { static: false })
	contextualMenuTemplate: TemplateRef<any>;
	@ViewChild("container", { static: false, read: ViewContainerRef })
	container: ViewContainerRef;
	@ViewChild("table", { static: false }) table;

	hasSelection: boolean;
	hasPagination: boolean;
	currentSort: Sort;
}

xdescribe("TableComponent", () => {
	// let tableComponent: TableComponent;
	// let testComponent: TestComponent;
	// let fixtureTestComponent: ComponentFixture<TestComponent>;
	// let dest: DebugElement;
	// const subscriptions = new Subscription();
	// beforeEach(async () => {
	// 	TestBed.configureTestingModule({
	// 		imports: [TableModule],
	// 		declarations: [TestComponent],
	// 		providers: [TableComponent, ColumnDirective, TemplateRef]
	// 	}).compileComponents();
	// });
	// beforeEach(() => {
	// 	fixtureTestComponent = TestBed.createComponent(TestComponent);
	// 	testComponent = fixtureTestComponent.componentInstance;
	// 	dest = fixtureTestComponent.debugElement.query(
	// 		By.directive(TableComponent)
	// 	);
	// 	tableComponent = dest.componentInstance;
	// 	fixtureTestComponent.detectChanges();
	// });
	// afterEach(async () => {
	// 	if (fixtureTestComponent) {
	// 		await fixtureTestComponent.destroy();
	// 	}
	// 	if (subscriptions) {
	// 		subscriptions.unsubscribe();
	// 	}
	// });
	// it("should create TestComponent and Table component", () => {
	// 	expect(testComponent)
	// 		.withContext("Can not create TestComponent")
	// 		.toBeDefined();
	// 	expect(tableComponent)
	// 		.withContext("Can not create TableComponent")
	// 		.toBeDefined();
	// });
	// it("should select all when clicking checkbox", () => {
	// 	const rows = [
	// 		{ id: "1", name: "Campaign" },
	// 		{ id: "2", name: "Theme" }
	// 	];
	// 	testComponent.rows = rows;
	// 	fixtureTestComponent.detectChanges();
	// 	subscriptions.add(
	// 		tableComponent.selectAll.subscribe(res =>
	// 			expect(res.length)
	// 				.withContext("The checkbox not emit all current items")
	// 				.toBe(rows.length)
	// 		)
	// 	);
	// 	tableComponent.onSelectAll(rows);
	// });
	// xit("should display checked when all the items are selected (expect for checkbox select all)", () => {
	// 	const rows = [
	// 		{ id: "1", name: "Campaign" },
	// 		{ id: "2", name: "Theme" }
	// 	];
	// 	testComponent.rows = rows;
	// 	testComponent.selection = new Map(rows.map(e => [e.id, true]));
	// 	testComponent.pending = false;
	// 	testComponent.hasSelection = true;
	// 	fixtureTestComponent.detectChanges();
	// 	const inpCheckboxApp = dest
	// 		.query(By.css("checkbox-app"))
	// 		.query(By.css("input"));
	// 	expect(inpCheckboxApp.nativeElement.getAttribute("value"))
	// 		.withContext(
	// 			"Checkbox select all not checked when all the items are selected"
	// 		)
	// 		.toBe("true");
	// });
	// xit("should display unchecked when all the items are not selected (expect for checkbox select all)", () => {
	// 	const rows = [
	// 		{ id: "1", name: "test1" },
	// 		{ id: "2", name: "test2" }
	// 	];
	// 	testComponent.rows = rows;
	// 	testComponent.selection = new Map([["1", true]]);
	// 	testComponent.pending = false;
	// 	testComponent.hasSelection = true;
	// 	fixtureTestComponent.detectChanges();
	// 	const inpCheckboxApp = fixtureTestComponent.debugElement
	// 		.query(By.css("checkbox-app"))
	// 		.query(By.css("input"));
	// 	expect(inpCheckboxApp.nativeElement.getAttribute("value"))
	// 		.withContext(
	// 			"Checkbox select all not checked when all the items are selected"
	// 		)
	// 		.toBe("false");
	// });
	// xit("should checked when the item has been selected (expect for checkbox select item)", () => {
	// 	const rows = [{ id: "1", name: "test1" }];
	// 	testComponent.rows = rows;
	// 	testComponent.selection = new Map([["1", true]]);
	// 	testComponent.pending = false;
	// 	testComponent.hasSelection = true;
	// 	fixtureTestComponent.detectChanges();
	// 	const inpCheckboxApp = fixtureTestComponent.debugElement
	// 		.query(By.css(".selectionCol>.cell"))
	// 		.query(By.css("input"));
	// 	expect(inpCheckboxApp.nativeElement.getAttribute("value"))
	// 		.withContext(
	// 			"Checkbox select not checked when the item has been selected"
	// 		)
	// 		.toBe("true");
	// });
	// it("should unselect all when clicking checkbox (the checkbox is selected) (expect for checkbox select all", () => {
	// 	const rows = [{}, {}];
	// 	subscriptions.add(
	// 		tableComponent.selectAll.subscribe(res =>
	// 			expect(res.length).toBe(rows.length)
	// 		)
	// 	);
	// 	tableComponent.onSelectAll(rows);
	// 	subscriptions.add(
	// 		tableComponent.unselectAll.subscribe(res => expect(res).toBeFalsy())
	// 	);
	// 	tableComponent.onUnselectAll();
	// });
	// it('should throw error when variable "selected" is undefined', () => {
	// 	spyOn(tableComponent, "isSelected").and.callThrough();
	// 	tableComponent.selected = undefined;
	// 	fixtureTestComponent.detectChanges();
	// 	expect(true).toBe(true);
	// });
	// it("should checked when clicking checkbox (the checkbox is selected) (expect for checkbox of item)", () => {
	// 	const rows = [
	// 		{ id: "1", name: "test1" },
	// 		{ id: "2", name: "test1" }
	// 	];
	// 	testComponent.rows = rows;
	// 	testComponent.hasSelection = true;
	// 	testComponent.selection = new Map([["2", true]]);
	// 	testComponent.pending = false;
	// 	spyOn(tableComponent, "onSelectOne");
	// 	subscriptions.add(
	// 		tableComponent.selectOne.subscribe(res =>
	// 			expect(res)
	// 				.withContext('Input "selectOne" should be emitted')
	// 				.toBe(rows[0])
	// 		)
	// 	);
	// 	tableComponent.onSelectOne(rows[0]);
	// 	fixtureTestComponent.detectChanges();
	// 	expect(tableComponent.onSelectOne)
	// 		.withContext('Should call fnc "onSelectOne"')
	// 		.toHaveBeenCalled();
	// });
	// it("should checked whether pagination and selection are displayed when `hasPagination` is true and not otherwise", () => {
	// 	const rows = [
	// 		{ id: "1", name: "test1" },
	// 		{ id: "2", name: "test1" }
	// 	];
	// 	testComponent.rows = rows;
	// 	testComponent.hasPagination = false;
	// 	fixtureTestComponent.detectChanges();
	// 	let paginationApp = fixtureTestComponent.debugElement.query(
	// 		By.css(".pagination-ctrl")
	// 	);
	// 	expect(paginationApp)
	// 		.withContext(
	// 			"pagination and selection sections should not be displayed when `hasPagination` is false"
	// 		)
	// 		.toBeFalsy();
	// 	testComponent.hasPagination = true;
	// 	fixtureTestComponent.detectChanges();
	// 	paginationApp = fixtureTestComponent.debugElement.query(
	// 		By.css(".pagination-ctrl")
	// 	);
	// 	expect(paginationApp)
	// 		.withContext(
	// 			"pagination and selection sections should be displayed when `hasPagination` is true"
	// 		)
	// 		.toBeTruthy("should be displayed");
	// });
	// it("should unchecked when clicking checkbox (the checkbox is selected) (expect for checkbox of item)", () => {
	// 	const rows = [
	// 		{ id: "1", name: "test1" },
	// 		{ id: "2", name: "test1" }
	// 	];
	// 	testComponent.rows = rows;
	// 	testComponent.hasSelection = true;
	// 	testComponent.selection = new Map([["1", true]]);
	// 	testComponent.pending = false;
	// 	spyOn(tableComponent, "onUnselectOne");
	// 	subscriptions.add(
	// 		tableComponent.unselectOne.subscribe(res =>
	// 			expect(res)
	// 				.withContext('Input "unselectOne" should be emitted')
	// 				.toBe(rows[0])
	// 		)
	// 	);
	// 	tableComponent.onUnselectOne(rows[0]);
	// 	fixtureTestComponent.detectChanges();
	// 	expect(tableComponent.onUnselectOne)
	// 		.withContext('Should call fnc "onUnselectOne"')
	// 		.toHaveBeenCalled();
	// });
	// // placeholder
	// it("should display placeholder", () => {
	// 	testComponent.rows = [];
	// 	testComponent.pending = false;
	// 	fixtureTestComponent.detectChanges();
	// 	const placeholder = fixtureTestComponent.debugElement.query(
	// 		By.css(".placeholder")
	// 	);
	// 	expect(placeholder).toBeTruthy();
	// 	expect(placeholder.nativeElement.innerText).toContain("No items");
	// });
	// // loading
	// it("should display loading when getting data", () => {
	// 	testComponent.pending = true;
	// 	fixtureTestComponent.detectChanges();
	// 	const pendingApp = fixtureTestComponent.debugElement.query(
	// 		By.css(".pendingCtnr")
	// 	);
	// 	expect(pendingApp).toBeTruthy();
	// });
	// // header + sort
	// it("should display header of table and number of columns is as same as templates defined", () => {
	// 	testComponent.pending = false;
	// 	fixtureTestComponent.detectChanges();
	// 	const columns = fixtureTestComponent.debugElement.queryAll(
	// 		By.css(".header.capitalize")
	// 	);
	// 	expect(columns.length).toEqual(tableComponent.columns.length);
	// });
	// it("should display sort icon (expert for angle down and up)", () => {
	// 	testComponent.currentSort = {
	// 		sortBy: "name",
	// 		descending: true
	// 	};
	// 	fixtureTestComponent.detectChanges();
	// 	const column = fixtureTestComponent.debugElement.query(
	// 		By.css(".header.capitalize")
	// 	);
	// 	let icon = column.query(By.css(".sortIcon"));
	// 	expect(icon.nativeElement.getAttribute("name"))
	// 		.withContext("should display angle down when descending true")
	// 		.toBe("angle-down");
	// 	testComponent.currentSort = {
	// 		sortBy: "name",
	// 		descending: false
	// 	};
	// 	fixtureTestComponent.detectChanges();
	// 	icon = column.query(By.css(".sortIcon"));
	// 	expect(icon.nativeElement.getAttribute("name"))
	// 		.withContext("should display angle up when descending false")
	// 		.toBe("angle-up");
	// });
	// it("should change sort icon when click column title", async () => {
	// 	const columnDirective = tableComponent.columns.first;
	// 	testComponent.currentSort = {
	// 		sortBy: "name",
	// 		descending: true
	// 	};
	// 	spyOn(tableComponent, "onSort").and.callThrough();
	// 	tableComponent.onSort(columnDirective);
	// 	fixtureTestComponent.detectChanges();
	// 	const column = fixtureTestComponent.debugElement.query(
	// 		By.css(".header.capitalize")
	// 	);
	// 	const icon = column.query(By.css(".sortIcon"));
	// 	expect(icon.nativeElement.getAttribute("name"))
	// 		.withContext("should display angle down when descending true")
	// 		.toBe("angle-down");
	// 	subscriptions.add(
	// 		tableComponent.sort.subscribe(res =>
	// 			expect(res)
	// 				.withContext('Input "sort" should be emitted')
	// 				.toBe({
	// 					sortBy: "name",
	// 					descending: false
	// 				})
	// 		)
	// 	);
	// 	expect(tableComponent.onSort)
	// 		.withContext('Should call fnc "onSort"')
	// 		.toHaveBeenCalled();
	// 	expect(tableComponent.currentSortedColumn)
	// 		.withContext("Current sorted column should as same as column clicked")
	// 		.toEqual(columnDirective);
	// });
	// it('should emit property "sort", sorting on all column and call resetSort when clicking column title', () => {
	// 	const firstColumn = tableComponent.columns.first;
	// 	const secondColumn = tableComponent.columns.last;
	// 	testComponent.currentSort = {
	// 		sortBy: "name",
	// 		descending: true
	// 	};
	// 	spyOn(tableComponent, "onSort").and.callThrough();
	// 	tableComponent.onSort(firstColumn);
	// 	spyOn(secondColumn, "resetSort").and.callThrough();
	// 	fixtureTestComponent.detectChanges();
	// 	subscriptions.add(
	// 		tableComponent.sort.subscribe(res =>
	// 			expect(res)
	// 				.withContext('Input "sort" should be emitted')
	// 				.toBe({
	// 					sortBy: "name",
	// 					descending: false
	// 				})
	// 		)
	// 	);
	// 	expect(tableComponent.onSort)
	// 		.withContext('Should call fnc "onSort"')
	// 		.toHaveBeenCalled();
	// 	expect(tableComponent.currentSortedColumn)
	// 		.withContext("Current sorted column should as same as column clicked")
	// 		.toEqual(firstColumn);
	// 	expect(secondColumn.resetSort)
	// 		.withContext("Should call reset sort")
	// 		.toHaveBeenCalledTimes(1);
	// });
	// it("should call ngOnChanges and reset all columns when changing currentSort", () => {
	// 	const firstColumn = tableComponent.columns.first;
	// 	const secondColumn = tableComponent.columns.last;
	// 	testComponent.currentSort = {
	// 		sortBy: "name",
	// 		descending: true
	// 	};
	// 	spyOn(tableComponent, "ngOnChanges").and.callThrough();
	// 	spyOn(secondColumn, "resetSort").and.callThrough();
	// 	spyOn(firstColumn, "resetSort").and.callThrough();
	// 	fixtureTestComponent.detectChanges();
	// 	expect(tableComponent.ngOnChanges)
	// 		.withContext("Should detect changes of table component")
	// 		.toHaveBeenCalled();
	// 	expect(firstColumn.resetSort)
	// 		.withContext("Should call reset sort")
	// 		.toHaveBeenCalledTimes(1);
	// 	expect(secondColumn.resetSort)
	// 		.withContext("Should call reset sort")
	// 		.toHaveBeenCalledTimes(1);
	// });
	// // width
	// it("should setting width of table and width of table will be total width of columns", () => {
	// 	spyOn(tableComponent, "getWidth").and.callThrough();
	// 	// tslint:disable-next-line:radix
	// 	const widthDefined = tableComponent.columns.reduce(
	// 		(a, b) =>
	// 			a + (typeof b.width === "string" ? parseInt(b.width) : b.width) || 0,
	// 		0
	// 	);
	// 	const width = tableComponent.getWidth();
	// 	expect(tableComponent.getWidth)
	// 		.withContext('Should call fnc "getWidth"')
	// 		.toHaveBeenCalled();
	// 	expect(width)
	// 		.withContext("Width of table should equal total width of columns")
	// 		.toEqual(widthDefined);
	// });
});
