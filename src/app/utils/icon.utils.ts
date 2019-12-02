import { EntityName } from '~core/models/utils';
import { Color } from '~utils/colors.enum';

export type Size = 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' | 'xxl';

export class IconUtils {

	static iconsMap = {
		[EntityName.ATTACHMENT]: 'file',
		[EntityName.ACTIVITY]: 'activity',
		[EntityName.CATEGORY]: 'category',
		[EntityName.COMMENT]: 'comments',
		[EntityName.CONTACT]: 'team',
		[EntityName.EVENT]: 'event',
		[EntityName.PRODUCT]: 'product',
		[EntityName.PROJECT]: 'project',
		[EntityName.SAMPLE]: 'sample',
		[EntityName.TAG]: 'tag',
		[EntityName.TASK]: 'check-circle',
		[EntityName.SUPPLIER]: 'supplier',
		[EntityName.LOCATION]: 'location',
		[EntityName.REQUEST]: 'envelope',
		[EntityName.REQUEST_ELEMENT]: 'envelope'
	};

	static iconsColorMap = {
		[EntityName.ATTACHMENT]: Color.SECONDARY,
		[EntityName.ACTIVITY]: Color.PRIMARY,
		[EntityName.CATEGORY]: Color.ACCENT,
		[EntityName.COMMENT]: Color.PRIMARY,
		[EntityName.CONTACT]: Color.SECONDARY,
		[EntityName.EVENT]: Color.SECONDARY,
		[EntityName.PRODUCT]: Color.PRIMARY,
		[EntityName.PROJECT]: Color.SECONDARY,
		[EntityName.SAMPLE]: Color.ACCENT,
		[EntityName.TAG]: Color.ACCENT,
		[EntityName.TASK]: Color.SUCCESS,
		[EntityName.SUPPLIER]: Color.VIBRANT,
		[EntityName.LOCATION]: Color.SECONDARY,
		[EntityName.REQUEST]: Color.SECONDARY,
		[EntityName.REQUEST_ELEMENT]: Color.SECONDARY
	};

	static iconsSizeMap: { [key in Size]: { background: number, icon: number, font: number } } = {
		xs: { background: 14, icon: 10, font: 2 },
		s: { background: 20, icon: 12, font: 4 },
		ms: { background: 27, icon: 12, font: 6 },
		m: { background: 32, icon: 16, font: 8 },
		l: { background: 36, icon: 24, font: 10 },
		xl: { background: 54, icon: 24, font: 16 },
		xxl: { background: 88, icon: 40, font: 32 }
	};

}
