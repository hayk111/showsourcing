import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ContentChild } from '@angular/core';
import { ControllerListService } from '../../services/controller-list.service';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { AutoUnsub } from '~utils';

@Component({
  selector: 'controller-list-actions-app',
  templateUrl: './controller-list-actions.component.html',
  styleUrls: ['./controller-list-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerListActionsComponent extends AutoUnsub implements OnInit {
  @Output() showAssigned = new EventEmitter<undefined>();
  @Output() hideAssigned = new EventEmitter<undefined>();
  @Output() showArchived = new EventEmitter<undefined>();
  @Output() hideArchived = new EventEmitter<undefined>();
  @Output() showTasksCompleted = new EventEmitter<undefined>();
	@Output() hideTasksCompleted = new EventEmitter<undefined>();
	@Input() searchValue: string;

  @ContentChild(SearchAutocompleteComponent, { static: true }) searchAutocomplete: SearchAutocompleteComponent;

  searchControl: FormControl;
  inputFocus = false;

  isArchivedShown = false;
  isAssigned = false;
  isCompletedTaskChecked = false;

  constructor(
    private controllerListService: ControllerListService
  ) { 
    super();
  }

  ngOnInit() {
    this.searchControl = new FormControl(this.searchValue);

    if (this.searchAutocomplete) {

      this.searchAutocomplete.itemSelected.pipe(
        takeUntil(this._destroy$)
      ).subscribe(() => {
        this.inputFocus = false;
      });

      this.searchAutocomplete.allItemsUnselected.pipe(
        takeUntil(this._destroy$)
      ).subscribe(() => {
        this.inputFocus = true;
      });
    }

    this.controllerListService.filtersClear.pipe(
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.isArchivedShown = this.isAssigned = false;
    });
  }

  toggleArchived() {
		this.isArchivedShown = !this.isArchivedShown;
		this.archivedChange();
  }
  
  toggleAssigned() {
    this.isAssigned = !this.isAssigned;
    this.assignedChange();
  }

  toggleCompletedTask() {
		this.isCompletedTaskChecked = !this.isCompletedTaskChecked;
		this.tasksCompletedChanged();
  }
  
  archivedChange() {
		if (this.isArchivedShown) {
			this.showArchived.emit();
		} else {
			this.hideArchived.emit();
		}
  }
  
  assignedChange() {
    if (this.isAssigned) {
      this.showAssigned.emit();
    } else {
      this.hideAssigned.emit();
    }
  }

  private tasksCompletedChanged() {
		if (this.isCompletedTaskChecked) {
			this.showTasksCompleted.emit();
		} else {
			this.hideTasksCompleted.emit();
		}
  }
  
}
