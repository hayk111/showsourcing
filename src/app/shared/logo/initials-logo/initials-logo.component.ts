import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Image } from '~core/erm3';
import { Typename } from '~core/erm3/typename.type';
import { UploaderService } from '~shared/file/services/uploader.service';
import { IconUtils, Size } from '~utils';

@Component({
	selector: 'initials-logo-app',
	templateUrl: './initials-logo.component.html',
	styleUrls: ['./initials-logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	@Input() type: Typename;
	@Input() size: Size = 'm';
	@ViewChild('initialsElement', { static: false }) initialsElement: ElementRef;

	// TODO define how we get the image
	@Input() image: Image;
	// TODO define how we get the nodeId
	nodeId: string;
	initials: string;
	pending = false;

	constructor(
		private hostElement: ElementRef,
		private uploaderSrv: UploaderService,
		private render: Renderer2
	) { }


	ngAfterViewInit() {
		const color = IconUtils.iconsColorMap[this.type] || 'secondary';
		const size = IconUtils.iconsSizeMap[this.size] || IconUtils.iconsSizeMap.m;
		this.render.setStyle(this.hostElement.nativeElement, 'height', `${size.background}px`);
		this.render.setStyle(this.hostElement.nativeElement, 'width', `${size.background}px`);
		if (this.initialsElement) {
			this.render.addClass(this.initialsElement.nativeElement, `bg-${color}`);
			this.render.setStyle(this.initialsElement.nativeElement, 'font-size', `${size.font}px`);
		}
	}

	addLogo(files: File[]) {
		this.pending = true;
		this.uploaderSrv.uploadImages(files, this.nodeId)
			.onTempImages(imgs => this.image = imgs[0])
			.subscribe(_ => {
				// do refetch or whatever is needed here
			});
	}

	private setInitials(text?: string) {
		if (text) {
			// we just take the first 4 separate strings
			const splitName = text.split(' ', 4);
			if (splitName.length === 1) {
				this.initials = splitName[0].slice(0, 4);
			} else if (splitName.length === 2) {
				this.initials = splitName.map(char => char.length ? char.slice(0, 2) : '').join('');
			} else if (splitName.length === 3) {
				// we got the first letter of of the first 2 words, and the first 2 of the last
				this.initials = splitName.map((char, i) => char.length ? char.slice(0, i === 2 ? 2 : 1) : '').join('');
			} else {
				this.initials = splitName.map(char => char.length ? char.slice(0, 1) : '').join('');
			}
		} else {
			this.initials = '-';
		}
	}

}
