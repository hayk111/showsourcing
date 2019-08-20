import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '~shared/icons';
import { ActivitiesBarComponent } from './activities-bar.component';
import { Component, ViewChild } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/entity-services/_global/select-params';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { By } from '@angular/platform-browser';

/* In the host component's template we will pass the inputs to the actual
 * component. Else ngOnChanges is not triggered.
 * see: https://stackoverflow.com/questions/37408801/testing-ngonchanges-lifecycle-hook-in-angular-2
 */
@Component({
	selector: `test-host-component`,
	template:
		`<activities-bar-app
			[favourite]="favourite"
			[hasSamples]="hasSamples"
			[hasTasks]="hasTasks"
			[hasComments]="hasComments"
			[votes]="votes"
			#activities>
		<activities-bar-app>`
})
export class TestHostComponent {
	@ViewChild('activities', { static: true }) component: ActivitiesBarComponent;
	votes = [];
	favourite = false;
	hasSamples = false;
	hasComments = false;
	hasTasks = false;
}

fdescribe('Component: ActivitiesBar', () => {
	let testComp: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TestHostComponent, ActivitiesBarComponent, IconComponent],
			imports: [RouterTestingModule.withRoutes([]), ApolloTestingModule]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		testComp = fixture.componentInstance;
	});

	it('should display heart icon when `favourite` is true and not otherwise', () => {
		testComp.favourite = true;
		fixture.detectChanges();
		let favIcon = fixture.nativeElement.querySelector('icon-app[name="heart"]');
		expect(favIcon).toBeTruthy();

		testComp.favourite = false;
		fixture.detectChanges();
		favIcon = fixture.nativeElement.querySelector('icon-app[name="heart"]');
		expect(favIcon).toBeFalsy();
	});

	it('should display sample icon when `hasSamples` is true and not otherwise', () => {
		testComp.hasSamples = true;
		fixture.detectChanges();
		let sampleIcon = fixture.nativeElement.querySelector('icon-app[name="sample"]');
		expect(sampleIcon).toBeTruthy();

		testComp.hasSamples = false;
		fixture.detectChanges();
		sampleIcon = fixture.nativeElement.querySelector('icon-app[name="sample"]');
		expect(sampleIcon).toBeFalsy();
	});

	it('should display check circle icon when `hasTasks` is true and not otherwise', () => {
		testComp.hasTasks = true;
		fixture.detectChanges();
		let taskIcon = fixture.nativeElement.querySelector('icon-app[name="check-circle"]');
		expect(taskIcon).toBeTruthy();

		testComp.hasTasks = false;
		fixture.detectChanges();
		taskIcon = fixture.nativeElement.querySelector('icon-app[name="check-circle"]');
		expect(taskIcon).toBeFalsy();
	});

	it('should display sample icon when `hasSamples` is true and not otherwise', () => {
		testComp.hasSamples = true;
		fixture.detectChanges();
		let sampleIcon = fixture.nativeElement.querySelector('icon-app[name="sample"]');
		expect(sampleIcon).toBeTruthy();

		testComp.hasSamples = false;
		fixture.detectChanges();
		sampleIcon = fixture.nativeElement.querySelector('icon-app[name="sample"]');
		expect(sampleIcon).toBeFalsy();
	});

	it('should display comments icon when `hasComments` is true and not otherwise', () => {
		testComp.hasComments = true;
		fixture.detectChanges();
		let commentIcon = fixture.nativeElement.querySelector('icon-app[name="comments"]');
		expect(commentIcon).toBeTruthy();

		testComp.hasComments = false;
		fixture.detectChanges();
		commentIcon = fixture.nativeElement.querySelector('icon-app[name="comments"]');
		expect(commentIcon).toBeFalsy();
	});

	it('should display votes star container when icon when has votes avg greatr than 0 and not otherwise', () => {
		let votesContainer = fixture.debugElement.query(By.css('.vote-star-container'));
		expect(votesContainer).toBeFalsy();

		testComp.votes = [{value: 100}, {value: 80}];
		fixture.detectChanges();

		votesContainer = fixture.debugElement.query(By.css('.vote-star-container'));
		expect(votesContainer).toBeTruthy();
	});
});
