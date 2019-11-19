import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AppImage, EntityName } from '~core/models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { colorMap, Size, sizeMap } from '../logo/logo.component';

@Component({
	selector: 'initials-logo-app',
	templateUrl: './initials-logo.component.html',
	styleUrls: ['./initials-logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialsLogoComponent implements AfterViewInit {

	private _name: string;
	@Input() set name(name: string) {
		this._name = name;
		this.setInitials(name);
	}
	get name() {
		return this._name;
	}
	private _image: AppImage;
	@Input() set image(image: AppImage) {
		this._image = image;
	}
	get image() {
		return this._image;
	}
	@Input() entity: any;
	@Input() type: EntityName;
	@Input() size: Size = 'm';

	@ViewChild('initialsElement', { static: false }) initialsElement: ElementRef;

	initials: string;

	constructor(
		private hostElement: ElementRef,
		private uploaderSrv: UploaderService,
		private render: Renderer2
	) { }

	ngAfterViewInit() {
		const color = colorMap[this.type] || 'secondary';
		const size = sizeMap[this.size] || sizeMap.m;
		this.render.setStyle(this.hostElement.nativeElement, 'height', `${size.background}px`);
		this.render.setStyle(this.hostElement.nativeElement, 'width', `${size.background}px`);
		this.render.addClass(this.initialsElement.nativeElement, `bg-${color}`);
		this.render.setStyle(this.initialsElement.nativeElement, 'font-size', `${size.icon}px`);
	}

	addLogo(files: File[]) {
		this.uploaderSrv.uploadImages(files, this.entity, 'logoImage', false, Client.TEAM).subscribe();
	}

	private setInitials(text?: string) {
		if (text) {
			// we just take the first 4 separate strings
			const splitName = text.split(' ', 4);
			this.initials = splitName.map(char => char.length ? char[0] : '').join('');
		} else {
			this.initials = '-';
		}
	}

}
