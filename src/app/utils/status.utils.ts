import { Color } from '~utils/colors.enum';
import { Status } from '~core/models/status.model';

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

	static NEW_STATUS_ID = 'new-status-id';

	static DEFAULT_STATUS_COLOR = StatusUtils.statusColorMap[StatusCategory.NEW];
	static DEFAULT_STATUS_CATEGORY = StatusCategory.NEW;

	static getStatusColor(status: Status) {
		if (!status || !StatusUtils.statusColorMap[status.category])
			return StatusUtils.DEFAULT_STATUS_COLOR;
		else
			return StatusUtils.DEFAULT_STATUS_COLOR[status.category];
	}

}
