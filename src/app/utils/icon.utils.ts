import { EntityName } from '~core/erm/entity-name.enum';
import { Color } from '~utils/colors.enum';

export type Size = 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';

export class IconUtils {

	static iconsMap = {
		[EntityName.ACTIVITY]: 'activity',
		[EntityName.ATTACHMENT]: 'file',
		[EntityName.EXPORT]: 'invoice',
		[EntityName.CATEGORY]: 'category',
		[EntityName.COMMENT]: 'comments',
		[EntityName.CONTACT]: 'contact',
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
		[EntityName.CONTACT]: Color.SECONDARY_BG,
		[EntityName.EVENT]: Color.SECONDARY,
		[EntityName.EXPORT]: Color.SECONDARY_BG,
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

	// @all, please don't add anymore sizes to this map. If your size isn't in this map it's probably something specific.
	// So put it somewhere else
	static iconsSizeMap: { [key in Size]: { background: number, icon: number, font: number } } = {
		xs: { background: 14, icon: 8, font: 2 },
		s: { background: 24, icon: 12, font: 4 },
		ms: { background: 28, icon: 12, font: 6 },
		m: { background: 32, icon: 16, font: 8 },
		l: { background: 36, icon: 24, font: 10 },
		xl: { background: 64, icon: 32, font: 16 },
		xxl: { background: 88, icon: 40, font: 32 },
		xxxl: { background: 147, icon: 32, font: 16 },
		xxxxl: { background: 240, icon: 48, font: 36 },
	};

	static DEFAULT_ICON_COLOR = Color.SECONDARY;

	static getIconColor(name: EntityName) {
		if (name && IconUtils.iconsColorMap[name])
			return IconUtils.iconsColorMap[name];
		else
			return IconUtils.DEFAULT_ICON_COLOR;
	}

}
