
const subNavItemsProducts = [{
	icon: 'product',
	link: ['/product'],
	translationKey: 'products',
},
{
	icon: 'sample',
	link: ['/samples'],
	translationKey: 'samples',
},
{
	icon: 'kanban',
	link: ['/product'],
	translationKey: 'boards',
}];

const subNavItemsDev = [
	{
		icon: 'dev',
		link: ['/dev', 'component-library'],
		translationKey: 'component-library'
	},
	{
		icon: 'cercle',
		link: ['/dev', 'playground'],
		translationKey: 'playground'
	}
];

export const sideNavItems = new Map<string, any>([
	['product', subNavItemsProducts],
	['supplier', []],
	['project', []],
	['task', []],
	['request', []],
	['dev', subNavItemsDev]
]);
