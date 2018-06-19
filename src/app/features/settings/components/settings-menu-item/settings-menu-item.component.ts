import {
	Component, Input, Output,
	EventEmitter, ContentChildren, QueryList,
	ElementRef,	Renderer2, OnChanges,
	OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutoUnsub } from '~utils';
import { SettingsMenuItemLabelDirective } from '../settings-menu-item-label/settings-menu-item-label.directive';

@Component({
	selector: 'settings-menu-item-app',
	templateUrl: './settings-menu-item.component.html',
	styleUrls: ['./settings-menu-item.component.scss']
})
export class SettingsMenuItemComponent extends AutoUnsub implements OnChanges, OnInit {
	@Input() hasChildren = false;
	@Input() link: string;
	@Output() expanded = new EventEmitter<boolean>();
	@ContentChildren(SettingsMenuItemLabelDirective, {descendants: true, read: ElementRef}) labelRefs: QueryList<ElementRef>;

	internalExpanded = false;
	selected = false;

	routerChangesSubscription: Subscription;

	constructor(private renderer: Renderer2, private router: Router, private location: Location) {
		super();
		this.routerChangesSubscription = router.events
			.pipe(takeUntil(this._destroy$))
			.subscribe((val) => {
				this.checkItemSelected();
			});
	}

	ngOnInit() {
		this.checkItemSelected();
	}

	checkItemSelected() {
		const path = this.location.path();
		this.selected = (path === this.link);
	}

	onToggleExpanded() {
		this.internalExpanded = !this.internalExpanded;
		this.expanded.emit(this.internalExpanded);
	}

	ngOnChanges(changes) {
		if (changes.internalExpanded) {
			const internalExpanded = changes.internalExpanded.currentValue;
			this.handleLabelDisplay(internalExpanded);
		}
	}

	onClickItem(event) {
		if (this.hasChildren && !this.internalExpanded) {
			this.internalExpanded = true;
			this.handleLabelDisplay(this.internalExpanded);
			this.expanded.emit(this.internalExpanded);
		}
		if (this.link) {
			this.router.navigate([ this.link ]);
		}
		event.stopPropagation();
	}

	handleLabelDisplay(internalExpanded: boolean) {
		this.labelRefs.forEach(labelRef => {
			this.renderer.setStyle(
				labelRef.nativeElement, 'display',
				internalExpanded ? 'block' : 'none');
		});
	}
}
