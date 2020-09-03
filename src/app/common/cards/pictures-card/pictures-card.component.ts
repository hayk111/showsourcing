import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { filter, tap} from 'rxjs/operators';
import { UploaderService } from '~shared/file/services/uploader.service';
import { api, Image } from 'showsourcing-api-lib';

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

	constructor(
		private uploaderSrv: UploaderService,
		private cdr: ChangeDetectorRef
	) {  }

	ngOnInit() {
		if (this.nodeId) {
			api.Image.findByNodeId$(this.nodeId, {
				sort: { direction: 'ASC', property: 'createdAt' }
			}).data$
				.pipe(
					filter((images: Image[]) => {
						return images.length && !!images[images.length - 1].url;
					}),
					tap((images: any[]) => {
						this.images = images;
						this.cdr.markForCheck();
					})
				)
				.subscribe();
		}
	}

	async addImages(files: File[]) {
		this.pending = true;
		this.uploaderSrv.uploadImages(files, this.nodeId)
			.onTempImages(tempImgs => {
				this.images.push(...tempImgs);
				this.cdr.markForCheck();
			})
			.subscribe(r => {
				this.pending = false;
				// listRef of images refetch()
			});
	}

}
