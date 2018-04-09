import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { HostBinding } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { CardFooterComponent } from '~app/shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '~app/shared/card/components/card-header/card-header.component';

// simply used to have a card component instead of using the class
@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() elevation = 'z-2';
	// the padding is for the content and footer not for the header
	@Input() padding = 'l';
	@Input() margin = 'default';
	@ContentChild(CardFooterComponent) footer: ElementRef;
	@ContentChild(CardHeaderComponent) header: ElementRef;



	get hasFooter() {
		return !!this.footer;
	}

	get hasHeader() {
		return !!this.header;
	}



	get mainStyle() {
		return {
			padding: 'var(--spacing-' + this.padding + ')',
		};
	}

	get footerStyle() {
		return {
			padding: 'var(--spacing-' + this.padding + ')',
		};
	}

	get ctnrStyle() {
		return {
			margin: 'var(--spacing-' + this.margin + ')',
		};
	}
}
