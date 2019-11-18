export class PreviewActionButton {
	icon: string;
	fontSet: 'fa' | 'svg' | '';
	text: string;
	action: Function;
	subMenuItems?: PreviewActionButton[];
	type?: 'rounded' | 'normal' | 'context';
	number?: number;
}
