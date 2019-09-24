import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotifLayoutComponent } from './notif-layout.component';


fdescribe('Notif Layout', () => {
	let component: NotifLayoutComponent;
	let fixture: ComponentFixture<NotifLayoutComponent>;
	let element: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [NotifLayoutComponent]
		});
		fixture = TestBed.createComponent(NotifLayoutComponent);
		component = fixture.componentInstance;
		element = fixture.nativeElement;
	});

	it('should display layout if [isOpen]=true', () => {
		component.isOpen = true;
		fixture.detectChanges();
		const layout = element.querySelector('div');
		expect(layout).toBeTruthy();
	});

	it('should not display layout if [isOpen]=false', () => {
		component.isOpen = false;
		fixture.detectChanges();
		const layout = element.querySelector('div');
		expect(layout).toBeFalsy();
	});

});
