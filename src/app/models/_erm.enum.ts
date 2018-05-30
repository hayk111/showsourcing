
/** enum used so we don't use strings eg:

switch (type) {
  case ERM.PRODUCT: ....
  case ERM.SUPPLIER: ...
}

the name ERM is for retrocompatibility */
export enum ERM {
	COMMENT,
	FILE,
	IMAGE,
	CATEGORY,
	CONTACT,
	CURRENCY,
	EVENT,
	PRODUCT_STATUS,
	PRODUCT_VOTE,
	PRODUCT,
	PROJECT,
	SUPPLIER_STATUS,
	SUPPLIER_TYPE,
	SUPPLIER,
	TAG,
	TASK,
	TEAM,
	USER
}
