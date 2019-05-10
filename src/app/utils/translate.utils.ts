import { ConstPipe } from '~shared/utils/pipes/const.pipe';

const constPipe = new ConstPipe();

export function translate(text: string, type = 'message') {
	return constPipe.transform(text, type);
}
