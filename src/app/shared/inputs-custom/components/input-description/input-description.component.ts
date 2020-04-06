import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'input-description-app',
	templateUrl: './input-description.component.html',
	styleUrls: ['./input-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDescriptionComponent implements OnChanges, OnInit {
	private _description = '';
	@Input() set description(description: string) {
		this._description = description;
		this.adaptSize();
	}
	get description() {
		return this._description;
	}
	@Input() hasLabel = false;
	// wether we display a modal or not
	@Input() asModal = true;
	@Output() update = new EventEmitter<string>();

	@ViewChild('container', { static: true }) container: ElementRef<HTMLElement>;

	showMore = false;

	constructor(
		private render: Renderer2,
		private dlgCommonSrv: DialogCommonService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.adaptSize();
	}

	ngOnChanges() {
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
		// we set the height the the limit
		this.showAll();
		// if the height is bigger than 85 and it has a description, we limit the height
		if (
			this.container.nativeElement.clientHeight > 80 &&
			this.description &&
			this.description.length
		) {
			this.render.setStyle(this.container.nativeElement, 'height', '80px');
			this.showMore = true;
		}
		this.cd.detectChanges();
	}

	openDescModal() {
		if (this.asModal)
			this.dlgCommonSrv
				.openDescriptionDlg({ description: this.description })
				.data$.subscribe((data) => {
					this.update.emit(data.description);
				});
	}
}
