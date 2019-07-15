export class PreviewActionButton {
	icon: string;
	fontSet: 'fa' | 'svg' | '';
	text: string;
	action: Function;
	subMenuItems?: Array<any>;
	type?: 'rounded' | 'normal' | 'context';
}
