
const subNavItemsProducts = [{
	icon: 'product',
	link: ['/product'],
	translationKey: 'products',
},
{
	icon: 'sample',
	link: ['/product'],
	translationKey: 'samples',
},
{
	icon: 'kanban',
	link: ['/product'],
	translationKey: 'boards',
}];

export const sideNavItems = new Map<string, any>([
	['product', subNavItemsProducts],
	['supplier', []],
	['project', []],
	['task', []],
	['request', []],
]);
