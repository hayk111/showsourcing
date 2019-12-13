import { Color } from '~utils/colors.enum';
import { Status } from '~core/models/status.model';
import { Task } from '~core/models';

export enum StatusCategory {
	NEW = 'new',
	PREPARATION = 'preparation',
	IN_PROGRESS = 'inProgress',
	VALIDATED = 'validated',
	REFUSED = 'refused',
}

export enum TaskStatus {
	DONE = '_Done',
	PENDING = '_Pending',
	OVERDUE = '_Overdue',
}

export enum ProjectStatus {
	DONE = '_Done',
	PENDING = '_Pending',
	OVERDUE = '_Overdue',
}

export class StatusUtils {

	static statusColorMap = {
		[StatusCategory.NEW]: Color.SECONDARY,
		[StatusCategory.PREPARATION]: Color.SECONDARY_LIGHT,
		[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
		[StatusCategory.VALIDATED]: Color.SUCCESS,
		[StatusCategory.REFUSED]: Color.WARN,
	};

	static statusIconColorMap = {
		[StatusCategory.NEW]: Color.THIRD,
		[StatusCategory.PREPARATION]: Color.SECONDARY_LIGHT,
		[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
		[StatusCategory.VALIDATED]: Color.SUCCESS,
		[StatusCategory.REFUSED]: Color.WARN,
	};

	static NEW_STATUS_ID = 'new-status-id';

	static DEFAULT_STATUS_COLOR = StatusUtils.statusColorMap[StatusCategory.NEW];
	static DEFAULT_STATUS_ICON_COLOR = StatusUtils.statusIconColorMap[StatusCategory.NEW];
	static DEFAULT_STATUS_CATEGORY = StatusCategory.NEW;

	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific color of the status, if there isn't any, returns default status color
	 */
	static getStatusColor(status: Status): Color {
		if (status && StatusUtils.statusColorMap[status.category])
			return StatusUtils.statusColorMap[status.category];
		else
			return StatusUtils.DEFAULT_STATUS_COLOR;
	}

	/**
	 * gets the icon color of a status from the status icon color map
	 * @param status
	 * @returns the specific icon color of the status, if there isn't any, returns default status icon color
	 */
	static getStatusIconColor(status: Status): Color {
		if (status && StatusUtils.statusColorMap[status.category])
			return StatusUtils.statusColorMap[status.category];
		else
			return StatusUtils.DEFAULT_STATUS_ICON_COLOR;
	}

	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific class color of the status, if there isn't any, returns default status class color
	 */
	static getStatusColorVar(status: Status) {
		return `var(--color-${StatusUtils.getStatusColor(status)})`;
	}

	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific class color of the status, if there isn't any, returns default status class color
	 */
	static getStatusIconColorVar(status: Status) {
		return `var(--color-${StatusUtils.getStatusIconColor(status)})`;
	}

	// TASKS STATUS

	/**
	 * using the property of the task 'done' and 'dueDate' calculates the task color
	 * @param task
	 * @returns the specific task color
	 */
	static getTaskStatusColor(task: Task) {
		if (task && task.done)
			return Color.SUCCESS;
		else if (this.isOverdue(task))
			return Color.WARN;
		else
			return StatusUtils.DEFAULT_STATUS_COLOR;
	}

	static getTaskStatusIconColor(task: Task) {
		if (task && task.done)
			return Color.SUCCESS;
		else if (this.isOverdue(task))
			return Color.WARN;
		else
			return StatusUtils.DEFAULT_STATUS_ICON_COLOR;
	}

	/**
	 * using the property of the task 'done' and 'dueDate' calculates the task class color
	 * @param task
	 * @returns the specific task class color
	 */
	static getTaskStatusColorVar(task: Task) {
		return `var(--color-${StatusUtils.getTaskStatusColor(task)})`;
	}

	/**
	 * using the property of the task 'done' and 'dueDate' calculates the task class color
	 * @param task
	 * @returns the specific task class color
	 */
	static getTaskStatusIconColorVar(task: Task) {
		return `var(--color-${StatusUtils.getTaskStatusIconColor(task)})`;
	}

	/**
	 * using the property 'dueDate' calculates if its overdue or not
	 * @param task
	 * @returns true if overdue, false otherwise
	 */
	static isOverdue(task: Task) {
		return task && task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString()));
	}

}
