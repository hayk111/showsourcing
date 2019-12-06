import { EntityName } from '~core/models/utils';
import { Color } from '~utils/colors.enum';

export type Size = 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' | 'xxl';

export class IconUtils {

	static iconsMap = {
		[EntityName.ACTIVITY]: 'activity',
		[EntityName.ATTACHMENT]: 'file',
		[EntityName.CATEGORY]: 'category',
		[EntityName.COMMENT]: 'comments',
		[EntityName.CONTACT]: 'team',
		[EntityName.EVENT]: 'event',
		[EntityName.LOCATION]: 'location',
		[EntityName.PROJECT]: 'project',
		[EntityName.REQUEST]: 'envelope',
		[EntityName.REQUEST_ELEMENT]: 'envelope',
		[EntityName.SAMPLE]: 'sample',
		[EntityName.SUPPLIER]: 'supplier',
		[EntityName.TAG]: 'tag',
		[EntityName.TASK]: 'check-circle',
		[EntityName.IMAGE]: 'camera',
		[EntityName.PRODUCT]: 'product',
	};

	static iconsColorMap = {
		[EntityName.ACTIVITY]: Color.PRIMARY,
		[EntityName.ATTACHMENT]: Color.SECONDARY,
		[EntityName.CATEGORY]: Color.ACCENT,
		[EntityName.COMMENT]: Color.PRIMARY,
		[EntityName.CONTACT]: Color.SECONDARY,
		[EntityName.EVENT]: Color.SECONDARY,
		[EntityName.IMAGE]: Color.SECONDARY,
		[EntityName.LOCATION]: Color.SECONDARY,
		[EntityName.PRODUCT]: Color.PRIMARY,
		[EntityName.PROJECT]: Color.SECONDARY,
		[EntityName.REQUEST]: Color.SECONDARY,
		[EntityName.REQUEST_ELEMENT]: Color.SECONDARY,
		[EntityName.SAMPLE]: Color.ACCENT,
		[EntityName.SUPPLIER]: Color.VIBRANT,
		[EntityName.TAG]: Color.ACCENT,
		[EntityName.TASK]: Color.SUCCESS,
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

	static DEFAULT_ICON_COLOR = Color.SECONDARY;

	static getIconColor(name: EntityName) {
		if (name && IconUtils.iconsColorMap[name])
			return IconUtils.iconsColorMap[name];
		else
			return IconUtils.DEFAULT_ICON_COLOR;
	}

}
