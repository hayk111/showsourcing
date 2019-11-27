import { Color } from '~utils/colors.enum';

export enum StatusCategory {
	NEW = 'new',
	PREPARATION = 'preparation',
	IN_PROGRESS = 'inProgress',
	VALIDATED = 'validated',
	REFUSED = 'refused',
}

export const statusColorMap = {
	[StatusCategory.NEW]: Color.SECONDARY,
	[StatusCategory.PREPARATION]: Color.SECONDARY_LIGHT,
	[StatusCategory.IN_PROGRESS]: Color.PRIMARY,
	[StatusCategory.VALIDATED]: Color.SUCCESS,
	[StatusCategory.REFUSED]: Color.WARN,
};
