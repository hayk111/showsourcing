import { EntityState } from "@modules/store";
import { Supplier } from "@modules/suppliers";
import { basicReducerFactory } from "@modules/store";
import { ActionType } from "@modules/suppliers";

// tslint:disable-next-line:no-empty-interface
export interface SupplierState extends EntityState<Supplier> {}

export const reducer = basicReducerFactory(ActionType)