import {
	Component, Input, Output,
	EventEmitter, ContentChildren, QueryList,
	ElementRef, Renderer2, OnChanges,
	OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutoUnsub } from '~utils';
import { SidenavItemLabelDirective } from '../sidenav-item-label/sidenav-item-label.directive';

@Component({
	selector: 'sidenav-item-app',
	templateUrl: './sidenav-item.component.html',
	styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent extends AutoUnsub implements OnChanges, OnInit {
	/** specify if the item has children */
	@Input() hasChildren = false;
	/** the link associated with the item */
	@Input() link: string;
	/** the expanded event for the item */
	@Output() expanded = new EventEmitter<boolean>();
	@ContentChildren(SidenavItemLabelDirective, { descendants: true, read: ElementRef }) labelRefs: QueryList<ElementRef>;

	/** the internal expanded state for the item */
	internalExpanded = false;
	/** the internal selected state for the item. Used to change the item background */
	selected = false;

	constructor(
		private renderer: Renderer2,
		private router: Router,
		private location: Location,
		private route: ActivatedRoute
	) {
		super();
		router.events.pipe(takeUntil(this._destroy$))
			.subscribe((val) => {
				this.checkItemSelected();
			});
	}

	ngOnInit() {
		this.checkItemSelected();
	}

	/** check if the item is selected based on path */
	checkItemSelected() {
		const path = this.location.path();
		this.selected = (path === this.link);
	}

	/** trigger expanded state change */
	onToggleExpanded() {
		this.internalExpanded = !this.internalExpanded;
		this.expanded.emit(this.internalExpanded);
	}

	/** detect if the internal expanded state changed */
	ngOnChanges(changes) {
		if (changes.internalExpanded) {
			const internalExpanded = changes.internalExpanded.currentValue;
			this.handleLabelDisplay(internalExpanded);
		}
	}

	/** handle click on the item */
	onClickItem(event) {
		if (this.hasChildren && !this.internalExpanded) {
			this.internalExpanded = true;
			this.handleLabelDisplay(this.internalExpanded);
			this.expanded.emit(this.internalExpanded);
		}
		if (this.link) {
			this.router.navigate([this.link], { relativeTo: this.route });
		}
		event.stopPropagation();
	}

	/** handle the display of the label according to expanded state */
	handleLabelDisplay(internalExpanded: boolean) {
		this.labelRefs.forEach(labelRef => {
			this.renderer.setStyle(
				labelRef.nativeElement, 'display',
				internalExpanded ? 'block' : 'none');
		});
	}
}
