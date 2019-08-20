import { translate } from '~utils/translate.utils';

const subNavItemsProducts = [{
	icon: 'product',
	link: ['/product'],
	label: translate('products')
},
{
	icon: 'sample',
	link: ['/product'],
	label: translate('samples')
},
{
	icon: 'kanban',
	link: ['/product'],
	label: translate('boards')
}];

export const sideNavItems = new Map<string, any>([
	['product', subNavItemsProducts],
	['supplier', []],
	['project', []],
	['task', []],
	['request', []],
]);
