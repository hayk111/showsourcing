
const subNavItemsProducts = [{
	icon: 'product',
	link: ['/products'],
	translationKey: 'products',
},
{
	icon: 'sample',
	link: ['/samples'],
	translationKey: 'samples',
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
