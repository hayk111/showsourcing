import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~core/erm';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'pictures-card-app',
	templateUrl: './pictures-card.component.html',
	styleUrls: ['./pictures-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class PicturesCardComponent implements OnInit {

	@Input() images: AppImage[];
	@Input() nodeId: string;
	@Output() uploaded = new EventEmitter<any>();

	defaultShown = 5;
	currentShown = this.defaultShown - 1;
	selectedIndex = 0;
	pending = false;

	constructor(private uploader: UploaderService) {  }

	ngOnInit() {
	}

	async addImages(files: File[]) {
		this.pending = true;
		this.uploader.uploadImages(files, this.nodeId)
			.onPendingImg(tempImg => )
			.onComplete()
			.subscribe(r =>
				r => this.images = this.images.concat(r.files),
				undefined,
				r
			);
	}

}
