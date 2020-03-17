import { Typename } from '~core/erm3/typename.type';


export function isLocalList(typename: Typename) {
	switch  (typename) {
		case 'Product':
		case 'Supplier':
		case 'Project':
		case 'Sample':
			return true;
		default:
			return false;
	}
}
