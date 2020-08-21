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
	}
	get description() {
		return this._description;
	}
	@Input() hasLabel = false;
	// wether we display a modal or not
	@Input() asModal = true;
	@Input() hoverLight = false;
	@Output() update = new EventEmitter<string>();

	@ViewChild('container', { static: true }) container: ElementRef<HTMLElement>;

	showMore = false;

	constructor(
		private render: Renderer2,
		private dlgCommonSrv: DialogCommonService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.adaptSize(this.countLines(this._description));
	}

	ngOnChanges() {
		this.adaptSize(this.countLines(this._description));
	}

	updateDescription(isCancel: boolean = true, newDescription: string) {
		if (!isCancel) {
			this.update.emit(newDescription);
		}
	}

	showAll() {
		this.openDescModal(false);
	}

	adaptSize(linesCount?: number) {
		// if the line count is hgher than 4 and it has a description, we limit the height
		if (linesCount > 4) {
			this.render.setStyle(this.container.nativeElement, 'height', '77px');
			this.render.setStyle(this.container.nativeElement, 'margin-left', '-8px');
			this.showMore = true;
		} else {
			this.render.setStyle(this.container.nativeElement, 'height', '100%');
			this.showMore = false;
		}
		this.cd.detectChanges();
	}

	openDescModal(editingMode = true) {
		if (this.asModal)
			this.dlgCommonSrv
				.openDescriptionDlg({ description: this.description, editingMode })
				.data$.subscribe((data) => {
					this.update.emit(data.description);
				});
	}

	private countLines(str): number {
		return str.split('\n').length;
	}
}
