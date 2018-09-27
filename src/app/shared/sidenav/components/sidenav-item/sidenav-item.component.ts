import {
	Component, Input, Output,
	EventEmitter, ContentChildren, QueryList,
	ElementRef, Renderer2, OnChanges,
	AfterContentInit, ContentChild
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutoUnsub } from '~utils';
import { SidenavItemLabelDirective } from '~shared/sidenav/components/sidenav-item-label/sidenav-item-label.directive';
import { SidenavItemGroupComponent } from '../sidenav-item-group/sidenav-item-group.component';
import { IconComponent } from '~shared/icons/components/icon/icon.component';

@Component({
	selector: 'sidenav-item-app',
	templateUrl: './sidenav-item.component.html',
	styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent extends AutoUnsub implements OnChanges, AfterContentInit {
	/** specify if the item has children */
	@Input() hasChildren = false;
	/** the link associated with the item */
	@Input() link: string;
	/** the link associated with the item */
	@Input() subItem: boolean;
	/** the expanded event for the item */
	@Output() expanded = new EventEmitter<boolean>();
	/** the expanded event for the item */
	@Output() select = new EventEmitter<any>();
	/** the label as a component */
	@ContentChildren(SidenavItemLabelDirective, { descendants: true, read: ElementRef }) labelRefs: QueryList<ElementRef>;
	/** the icon contained in the item component */
	@ContentChild(IconComponent) icon: IconComponent;
	/** the usb items if any */
	@ContentChildren(SidenavItemComponent) items: QueryList<SidenavItemComponent>;

	/** the internal expanded state for the item */
	internalExpanded = false;
	/** the internal selected state for the item. Used to change the item background */
	selected = false;
	/** the internal selected state for the item. Used to change the item background */
	subItemSelected = false;

	constructor(
		private renderer: Renderer2,
		private router: Router,
		private location: Location,
		private route: ActivatedRoute
	) {
		super();
		router.events.pipe(takeUntil(this._destroy$))
			.subscribe((val) => {
				if (!this.hasChildren) {
					// Trigger check if has no children
					this.checkItemSelected();
				} else if (this.items) {
					// Check if there a sub item selected to trigger check
					// Must wait for the sub item to detect changes and check
					// selection
					setTimeout(() => {
						let hasSubItemSelected = false;
						this.items.toArray().slice(1).forEach(item => {
							if (item.selected) {
								hasSubItemSelected = true;
							}
						});
						if (!hasSubItemSelected) {
							this.checkItemSelected();
						}
					});
				}
			});
	}

	ngAfterContentInit() {
		if (this.items) {
			// Check events (selection and expansion) on sub items
			this.items.toArray().slice(1).forEach(item => {
				item.subItem = true;
				item.expanded.pipe(takeUntil(this._destroy$)).subscribe(() => {
					this.expanded.emit(true);
				});
				item.select.pipe(takeUntil(this._destroy$)).subscribe((selected) => {
					if (selected) {
						this.subItemSelected = true;
						this.expanded.emit(true);
					} else {
						this.subItemSelected = false;
					}
				});
			});
		}

		// Initial check for sub items
		this.items.toArray().slice(1).forEach(item => {
			if (item.selected) {
				this.subItemSelected = true;
				this.internalExpanded = true;
				setTimeout(() => this.expanded.emit(true));
			}
		});

		this.checkItemSelected();
	}

	/** check if the item is selected based on path */
	checkItemSelected() {
		// Check if the path corresponds to the configured link
		const path = this.location.path();
		if (this.link) {
			if (this.link.startsWith('./') || this.link.startsWith('../')) {
				const transformedLink = this.link.replace(/\.\//g, '');
				this.selected = path.endsWith(transformedLink);
			} else {
				this.selected = (path === this.link);
			}
		} else {
			this.selected = false;
		}

		this.select.emit(this.icon);
		// Manage icon selection (bold)
		if (this.icon && this.icon.name) {
			const { name } = this.icon;
			if (this.selected || this.subItemSelected) {
				if (!name.endsWith('-dark')) {
					this.icon.name = name + '-dark';
					this.icon.ngOnChanges({
						name: {
							currentValue: name,
							previousValue: this.icon.name
						}
					});
				}
			} else {
				if (name.endsWith('-dark')) {
					this.icon.name = name.replace('-dark', '');
					this.icon.ngOnChanges({
						name: {
							currentValue: name,
							previousValue: this.icon.name
						}
					});
				}
			}
		}
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
			if (this.items) {
				this.items.forEach(item => {
					item.internalExpanded = internalExpanded;
				});
			}
			this.handleLabelDisplay(internalExpanded);
		}
	}

	/** handle click on the item */
	onClickItem(event) {
		if (this.hasChildren) {
			this.internalExpanded = true;
			this.selected = true;
			this.subItemSelected = true;
			this.handleLabelDisplay(this.internalExpanded);
			this.expanded.emit(this.internalExpanded);
			this.select.emit();
			const items = this.items ? this.items.toArray() : null;
			// Display the first element of sub items if clicked
			if (items && items.length > 0) {
				const firstItem = items.slice(1)[0];
				if (firstItem.link) {
					setTimeout(() => {
						this.router.navigate([firstItem.link], { relativeTo: this.route });
					});
				}
			}
		} else if (this.link) {
			this.select.emit();
			setTimeout(() => {
				this.router.navigate([this.link], { relativeTo: this.route });
			});
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
