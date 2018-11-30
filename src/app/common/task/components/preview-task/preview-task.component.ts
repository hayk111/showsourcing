import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '~entity-services';
import { ERM, Task } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'preview-task-app',
	templateUrl: './preview-task.component.html',
	styleUrls: ['./preview-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTaskComponent extends AutoUnsub implements OnInit, AfterViewChecked {

	@Input() set task(value: Task) {
		this._task = value;
	}
	@Output() close = new EventEmitter<null>();
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	task$: Observable<Task>;
	private _task: Task;
	erm = ERM;
	menuOpen = false;

	constructor(
		private taskSrv: TaskService) {
		super();
	}

	ngOnInit() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
	}

	ngAfterViewChecked() {
		if (this.menuOpen && this.selector) {
			this.selector.open();
			this.selector.selector.ngSelect.updateDropdownPosition();
		}
	}

	update(value: any, prop: string) {
		this.taskSrv.update({ id: this._task.id, [prop]: value }).subscribe();
	}

	updateDueDate(isCancel: boolean, value: Date) {
		if (!isCancel && isCancel !== undefined) this.update(value, 'dueDate');
	}

	toggleSelector(is: boolean) {
		if (this.selector) {
			this.menuOpen = false;
		} else this.menuOpen = is;
	}

	closeMenu() {
		this.menuOpen = false;
	}
}
