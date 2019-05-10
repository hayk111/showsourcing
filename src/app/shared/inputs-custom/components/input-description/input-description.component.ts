import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { DialogService } from '~shared/dialog';
import { DescriptionDlgComponent } from '~common/modals/component/description-dlg/description-dlg.component';

@Component({
	selector: 'input-description-app',
	templateUrl: './input-description.component.html',
	styleUrls: ['./input-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDescriptionComponent implements AfterViewInit {

	@Input() description = '';
	@Input() hasLabel = false;
	@Input() isBig = false;
	// wether we display a modal or not
	@Input() asModal = true;
	@Output() update = new EventEmitter<string>();

	@ViewChild('container') container: ElementRef<HTMLElement>;

	showMore = false;

	constructor(
		private render: Renderer2,
		private dlgSrv: DialogService,
		private cd: ChangeDetectorRef) { }


	ngAfterViewInit() {
		this.adaptSize();
	}

	updateDescription(isCancel: boolean = true, newDescription: string) {
		if (!isCancel) {
			this.update.emit(newDescription);
		}
		this.adaptSize();
	}

	showAll() {
		this.render.setStyle(this.container.nativeElement, 'height', '100%');
		this.showMore = false;
	}

	adaptSize() {
		if (this.container.nativeElement.clientHeight > 85 && !this.showMore) {
			this.render.setStyle(this.container.nativeElement, 'height', '85px');
			this.showMore = true;
		} else if (this.showMore === true) {
			this.render.setStyle(this.container.nativeElement, 'height', '85px');
		} else {
			this.render.setStyle(this.container.nativeElement, 'height', '100%');
			this.showMore = false;
		}
		this.cd.detectChanges();
	}

	openDescModal() {
		if (this.asModal)
			this.dlgSrv.open(DescriptionDlgComponent, { description: this.description })
				.subscribe(item => this.update.emit(item.description));
	}
}
