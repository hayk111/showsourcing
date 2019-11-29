import { Color } from '~utils/colors.enum';
import { Status } from '~core/models/status.model';

export enum StatusCategory {
	NEW = 'new',
	PREPARATION = 'preparation',
	IN_PROGRESS = 'inProgress',
	VALIDATED = 'validated',
	REFUSED = 'refused',
}

export class StatusUtils {

	static statusColorMap = {
		[StatusCategory.NEW]: Color.SECONDARY,
		[StatusCategory.PREPARATION]: Color.SECONDARY_LIGHT,
		[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
		[StatusCategory.VALIDATED]: Color.SUCCESS,
		[StatusCategory.REFUSED]: Color.WARN,
	};

	static defaultStatusColor = StatusUtils.statusColorMap[StatusCategory.NEW];

	getStatusColor(status: Status) {

	}

}