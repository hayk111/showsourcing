import { EntityName } from '~core/erm/entity-name.enum';
import { Color } from '~utils/colors.enum';
import { Typename } from '~core/erm3/typename.type';

export type Size = 'xs' | 's' | 'ms' | 'm' | 'l' | 'xl' | 'xxl';

export class IconUtils {

	static iconsMap: Partial<Record<Typename, string>> = {
		Activity: 'activity',
		Attachment: 'file',
		Export: 'invoice',
		Category: 'category',
		Comment: 'comments',
		Contact: 'contact',
		Event: 'event',
		Location: 'location',
		Project: 'project',
		Request: 'envelope',
		RequestElement: 'envelope',
		Sample: 'sample',
		Supplier: 'supplier',
		Tag: 'tag',
		Task: 'check-circle',
		Image: 'camera',
		Product: 'product',
	};

	static iconsColorMap: Partial<Record<Typename, Color>> = {
		Activity: Color.PRIMARY,
		Attachment: Color.SECONDARY,
		Category: Color.ACCENT,
		Comment: Color.PRIMARY,
		Contact: Color.SECONDARY_BG,
		Event: Color.SECONDARY,
		Export: Color.SECONDARY_BG,
		Image: Color.SECONDARY,
		Location: Color.SECONDARY,
		Product: Color.PRIMARY,
		Project: Color.SECONDARY,
		Request: Color.SECONDARY,
		RequestElement: Color.SECONDARY,
		Sample: Color.ACCENT,
		Supplier: Color.VIBRANT,
		Tag: Color.ACCENT,
		Task: Color.SUCCESS,
		User: Color.PRIMARY
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
