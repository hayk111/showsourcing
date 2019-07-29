import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableModule } from '../../table.module';
import { By } from '@angular/platform-browser';
import { ListViewComponent } from '~core/list-page';
import { ID, uuid } from '~utils';

describe('TableComponent', () => {
	let tableComponent: TableComponent;
	let fixture: ComponentFixture<TableComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TableModule]
		});

	});

	// beforeEach(() => {
	// 	fixture = TestBed.createComponent(TableComponent);
	// 	tableComponent = fixture.componentInstance;
	// 	fixture.detectChanges();
	// });

	// afterEach(async() => {
	// 	fixture.destroy();
	// });

	it('should create TableComponent', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;

		expect(tableComponent).toBeDefined();
	});

	it('should select all when click checkbox', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;
		const rows = [{}, {}];
		fixture.detectChanges();
		tableComponent.selectAll.subscribe((res) => expect(res.length).toBe(rows.length));
		tableComponent.onSelectAll(rows);
	});

	it('should unselect all when click checkbox', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;

		const rows = [{}, {}];
		tableComponent.selectAll.subscribe((res) => expect(res.length).toBe(rows.length));
		tableComponent.onSelectAll(rows);
		tableComponent.unselectAll.subscribe((res) => expect(res).toBeFalsy());
		tableComponent.onUnselectAll();
	});

	it('should display placeholder', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;

		tableComponent.rows = [];
		tableComponent.placeholder = 'No items';

		fixture.detectChanges();
		const placeholder = fixture.debugElement.query(By.css('.placeholder'));
		expect(placeholder).toBeTruthy();
		expect(placeholder.nativeElement.innerText).toContain('No items');
	});

	it('should display loading when getting data', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;

		tableComponent.pending = true;
		fixture.detectChanges();

		const pendingApp = fixture.debugElement.query(By.css('.pendingCtnr'));
		expect(pendingApp).toBeTruthy();
	});

	it('should display pagination and current page is 1 when have items', () => {
		fixture = TestBed.createComponent(TableComponent);
		tableComponent = fixture.componentInstance;

		tableComponent.rows = [{}, {}];
		tableComponent.skipped = 0;

		fixture.detectChanges();
		const pagination = fixture.debugElement.query(By.css('.pagination-ctrl'));

		expect(pagination).toBeTruthy();
		const currentPage = pagination.query(By.css('.selected')).nativeElement;

		expect(currentPage.innerText).toBe('1');
	});

});
