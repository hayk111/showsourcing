import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'pictures-card-app',
	templateUrl: './pictures-card.component.html',
	styleUrls: ['./pictures-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class PicturesCardComponent implements OnInit {
	@Input() nodeId: string;
	images = [];
	defaultShown = 5;
	currentShown = this.defaultShown - 1;
	selectedIndex = 0;
	pending = false;

	constructor(private uploaderSrv: UploaderService) {  }

	ngOnInit() {
		// TODO query images
	}

	async addImages(files: File[]) {
		this.pending = true;
		this.uploaderSrv.uploadImages(files, this.nodeId)
			.onTempImages(tempImgs => this.images.push(...tempImgs))
			.subscribe(r => {
				// listRef of images refetch()
			});
	}

}
