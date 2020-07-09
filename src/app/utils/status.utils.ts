import { Color } from '~utils/colors.enum';
import { Task } from '~core/erm';
import { WorkflowStatus } from '~core/erm3/models';

export enum StatusCategory {
	PREPARATION = 'Preparation', // ? What is preparation ?
	NEW = 'NEW',
	IN_PROGRESS = 'INPROGRESS',
	VALIDATED = 'VALIDATED',
	REFUSED = 'REFUSED',
}


export enum RequestStatus {
	CANCELED = 'canceled',
	ERROR = 'error',
	PENDING = 'pending',
	REFUSED = 'refused',
	REPLIED = 'replied',
	RESENT = 'resent',
	SENT = 'sent',
	VALIDATED = 'validated',
}

export class StatusUtils {

	static statusColorMap = {
		[StatusCategory.NEW]: Color.SECONDARY,
		[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
		[StatusCategory.VALIDATED]: Color.SUCCESS,
		[StatusCategory.REFUSED]: Color.WARN,
	};

	static statusIconColorMap = {
		[StatusCategory.NEW]: Color.THIRD,
		[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
		[StatusCategory.VALIDATED]: Color.SUCCESS,
		[StatusCategory.REFUSED]: Color.WARN,
	};

	static NEW_STATUS_ID = 'new-status-id';

	static DEFAULT_STATUS_COLOR = StatusUtils.statusColorMap[StatusCategory.NEW];
	static DEFAULT_STATUS_ICON_COLOR = StatusUtils.statusIconColorMap[StatusCategory.NEW];
	static DEFAULT_STATUS_CATEGORY = StatusCategory.NEW;

	/** magic number for 2 weeks in miliseconds */
	static twoWeeks = 12096e5;
	static twoWeeksAgo = (new Date(+new Date - StatusUtils.twoWeeks));


	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific color of the status, if there isn't any, returns default status color
	 */
	static getStatusColor(status: WorkflowStatus): Color {
		if (status?.name && StatusUtils.statusColorMap[status.category])
			return StatusUtils.statusColorMap[status.category];
		else
			return StatusUtils.DEFAULT_STATUS_COLOR;
	}

	/**
	 * gets the icon color of a status from the status icon color map
	 * @param status
	 * @returns the specific icon color of the status, if there isn't any, returns default status icon color
	 */
	static getStatusIconColor(status: WorkflowStatus): Color {
		if (status?.name && StatusUtils.statusColorMap[status.category])
			return StatusUtils.statusColorMap[status.category];
		else
			return StatusUtils.DEFAULT_STATUS_ICON_COLOR;
	}

	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific class color of the status, if there isn't any, returns default status class color
	 */
	static getStatusColorVar(status: WorkflowStatus) {
		return `var(--color-${StatusUtils.getStatusColor(status)})`;
	}

	/**
	 * gets the color of a status from the status color map
	 * @param status
	 * @returns the specific class color of the status, if there isn't any, returns default status class color
	 */
	static getStatusIconColorVar(status: WorkflowStatus) {
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

	// REQUEST STATUS

	/**
	 * using the properties status, creation date from a request, calculates the request status color
	 * @param status
	 * @param creationDate creation date of the request (only used for request accessed from the Supplier client)
	 * @param isTeam wheater we are accessing the request from the team client or not
	 * @returns the specific request status color
	 */
	static getRequestStatusColor(status: RequestStatus, creationDate?: Date, isTeam = true) {
		if (isTeam) {
			switch (status) {
				case RequestStatus.REPLIED:
					return Color.PRIMARY;
				case RequestStatus.VALIDATED:
					return Color.SUCCESS;
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return Color.WARN;
				default:
					return StatusUtils.DEFAULT_STATUS_COLOR;
			}
		} else {
			if (!creationDate)
				throw Error(`creation date for the request color status: "${status}", is needed`);
			switch (status) {
				case RequestStatus.PENDING:
				case RequestStatus.SENT:
				case RequestStatus.RESENT:
					return creationDate.getTime() < StatusUtils.twoWeeksAgo.getTime() ? Color.ACCENT : Color.PRIMARY;
				case RequestStatus.REPLIED:
				case RequestStatus.VALIDATED:
					return Color.SUCCESS;
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return Color.WARN;
				default:
					return StatusUtils.DEFAULT_STATUS_COLOR;
			}
		}
	}

	/**
	 * using the properties status, creation date from a request, calculates the request status color
	 * @param status
	 * @param creationDate creation date of the request (only used for request accessed from the Supplier client)
	 * @param isTeam wheater we are accessing the request from the team client or not
	 * @returns the specific request status color
	 */
	static getRequestStatusIconColor(status: RequestStatus, creationDate?: Date, isTeam = true) {
		if (isTeam) {
			switch (status) {
				case RequestStatus.REPLIED:
					return Color.PRIMARY;
				case RequestStatus.VALIDATED:
					return Color.SUCCESS;
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return Color.WARN;
				default:
					return StatusUtils.DEFAULT_STATUS_ICON_COLOR;
			}
		} else {
			if (!creationDate)
				throw Error(`creation date for the request icon color status: "${status}", is needed`);
			switch (status) {
				case RequestStatus.PENDING:
				case RequestStatus.SENT:
				case RequestStatus.RESENT:
					return creationDate.getTime() < StatusUtils.twoWeeksAgo.getTime() ? Color.ACCENT : Color.PRIMARY;
				case RequestStatus.REPLIED:
				case RequestStatus.VALIDATED:
					return Color.SUCCESS;
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return Color.WARN;
				default:
					return StatusUtils.DEFAULT_STATUS_ICON_COLOR;
			}
		}
	}

	/**
	 * using the properties status, creation date from a request, calculates the request class color
	 * @param status
	 * @param creationDate creation date of the request (only used for request accessed from the Supplier client)
	 * @param isTeam wheater we are accessing the request from the team client or not
	 * @returns the specific request class color
	 */
	static getRequestStatusColorVar(status: RequestStatus, creationDate?: Date, isTeam = true) {
		return `var(--color-${StatusUtils.getRequestStatusColor(status)})`;
	}

	/**
	 * using the properties status, creation date from a request, calculates the request status icon class color
	 * @param status
	 * @param creationDate creation date of the request (only used for request accessed from the Supplier client)
	 * @param isTeam wheater we are accessing the request from the team client or not
	 * @returns the specific request status icon class color
	 */
	static getRequestStatusIconColorVar(status: RequestStatus, creationDate?: Date, isTeam = true) {
		return `var(--color-${StatusUtils.getRequestStatusIconColor(status)})`;
	}

}
