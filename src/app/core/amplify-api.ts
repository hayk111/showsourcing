/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";

export type CreateTeamInput = {
  name: string;
  companyId: string;
};

export enum Lang {
  EN = "EN",
  FR = "FR",
  CN = "CN"
}

export type UpdateUserInput = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  preferredLanguage?: Lang | null;
  avatar?: string | null;
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  preferredLanguage?: ModelLangInput | null;
  avatar?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelLangInput = {
  eq?: Lang | null;
  ne?: Lang | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type CreateProductInput = {
  id: string;
  name: string;
  teamId: string;
  price?: PriceInput | null;
  description?: string | null;
  favorite?: boolean | null;
  minimumOrderQuantity?: number | null;
  moqDescription?: string | null;
  score?: number | null;
  incoTerm?: string | null;
  harbour?: string | null;
  masterCbm?: number | null;
  quantityPer20ft?: number | null;
  quantityPer40ft?: number | null;
  quantityPer40ftHC?: number | null;
  leadTimeValue?: number | null;
  leadTimeUnit?: string | null;
  sample?: boolean | null;
  samplePrice?: PriceInput | null;
  archived: boolean;
  reference?: string | null;
  referenceKey?: number | null;
  creationDate: number;
  deletionDate?: number | null;
  lastUpdatedDate: number;
  deleted: boolean;
  productSupplierId?: string | null;
  productAssigneeId?: string | null;
  productCreatedById: string;
  productDeletedById?: string | null;
};

export type PriceInput = {
  id: string;
  currency?: string | null;
  value?: number | null;
  baseCurrencyValue?: number | null;
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  favorite?: ModelBooleanInput | null;
  minimumOrderQuantity?: ModelIntInput | null;
  moqDescription?: ModelStringInput | null;
  score?: ModelIntInput | null;
  incoTerm?: ModelStringInput | null;
  harbour?: ModelStringInput | null;
  masterCbm?: ModelFloatInput | null;
  quantityPer20ft?: ModelIntInput | null;
  quantityPer40ft?: ModelIntInput | null;
  quantityPer40ftHC?: ModelIntInput | null;
  leadTimeValue?: ModelIntInput | null;
  leadTimeUnit?: ModelStringInput | null;
  sample?: ModelBooleanInput | null;
  archived?: ModelBooleanInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelProductConditionInput | null> | null;
  or?: Array<ModelProductConditionInput | null> | null;
  not?: ModelProductConditionInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateProductInput = {
  id: string;
  name?: string | null;
  teamId: string;
  price?: PriceInput | null;
  description?: string | null;
  favorite?: boolean | null;
  minimumOrderQuantity?: number | null;
  moqDescription?: string | null;
  score?: number | null;
  incoTerm?: string | null;
  harbour?: string | null;
  masterCbm?: number | null;
  quantityPer20ft?: number | null;
  quantityPer40ft?: number | null;
  quantityPer40ftHC?: number | null;
  leadTimeValue?: number | null;
  leadTimeUnit?: string | null;
  sample?: boolean | null;
  samplePrice?: PriceInput | null;
  archived?: boolean | null;
  reference?: string | null;
  referenceKey?: number | null;
  creationDate?: number | null;
  deletionDate?: number | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  productSupplierId?: string | null;
  productAssigneeId?: string | null;
  productCreatedById?: string | null;
  productDeletedById?: string | null;
};

export type DeleteProductInput = {
  teamId: string;
  id: string;
};

export type CreateSupplierInput = {
  id: string;
  teamId: string;
  name: string;
  fullName?: string | null;
  tradingName?: string | null;
};

export type ModelSupplierConditionInput = {
  name?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  tradingName?: ModelStringInput | null;
  and?: Array<ModelSupplierConditionInput | null> | null;
  or?: Array<ModelSupplierConditionInput | null> | null;
  not?: ModelSupplierConditionInput | null;
};

export type UpdateSupplierInput = {
  id: string;
  teamId: string;
  name?: string | null;
  fullName?: string | null;
  tradingName?: string | null;
};

export type DeleteSupplierInput = {
  teamId: string;
  id: string;
};

export type CreateCompanyInput = {
  name: string;
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null;
  ownerUserId?: ModelIDInput | null;
  createdByUserId?: ModelIDInput | null;
  createdOn?: ModelIntInput | null;
  lastUpdatedByUserId?: ModelIDInput | null;
  lastUpdatedOn?: ModelIntInput | null;
  and?: Array<ModelCompanyConditionInput | null> | null;
  or?: Array<ModelCompanyConditionInput | null> | null;
  not?: ModelCompanyConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateCompanyInput = {
  id: string;
  name?: string | null;
  ownerUserId?: string | null;
  createdByUserId?: string | null;
  createdOn?: number | null;
  lastUpdatedByUserId?: string | null;
  lastUpdatedOn?: number | null;
};

export type DeleteCompanyInput = {
  id?: string | null;
};

export type ModelIDKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
  description?: ModelStringInput | null;
  favorite?: ModelBooleanInput | null;
  minimumOrderQuantity?: ModelIntInput | null;
  moqDescription?: ModelStringInput | null;
  score?: ModelIntInput | null;
  incoTerm?: ModelStringInput | null;
  harbour?: ModelStringInput | null;
  masterCbm?: ModelFloatInput | null;
  quantityPer20ft?: ModelIntInput | null;
  quantityPer40ft?: ModelIntInput | null;
  quantityPer40ftHC?: ModelIntInput | null;
  leadTimeValue?: ModelIntInput | null;
  leadTimeUnit?: ModelStringInput | null;
  sample?: ModelBooleanInput | null;
  archived?: ModelBooleanInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelProductFilterInput | null> | null;
  or?: Array<ModelProductFilterInput | null> | null;
  not?: ModelProductFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelSupplierFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  tradingName?: ModelStringInput | null;
  and?: Array<ModelSupplierFilterInput | null> | null;
  or?: Array<ModelSupplierFilterInput | null> | null;
  not?: ModelSupplierFilterInput | null;
};

export type ModelTeamFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  ownerUserId?: ModelIDInput | null;
  companyId?: ModelIDInput | null;
  createdByUserId?: ModelIDInput | null;
  createdOn?: ModelIntInput | null;
  lastUpdatedByUserId?: ModelIDInput | null;
  lastUpdatedOn?: ModelIntInput | null;
  and?: Array<ModelTeamFilterInput | null> | null;
  or?: Array<ModelTeamFilterInput | null> | null;
  not?: ModelTeamFilterInput | null;
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  ownerUserId?: ModelIDInput | null;
  createdByUserId?: ModelIDInput | null;
  createdOn?: ModelIntInput | null;
  lastUpdatedByUserId?: ModelIDInput | null;
  lastUpdatedOn?: ModelIntInput | null;
  and?: Array<ModelCompanyFilterInput | null> | null;
  or?: Array<ModelCompanyFilterInput | null> | null;
  not?: ModelCompanyFilterInput | null;
};

export type CreateTeamMutation = {
  __typename: "Team";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  companyId: string;
  company: {
    __typename: "Company";
    id: string;
    name: string;
    ownerUserId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  preferredLanguage: Lang | null;
  avatar: string | null;
  creationDate: number | null;
};

export type CreateProductMutation = {
  __typename: "Product";
  id: string;
  name: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  price: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  description: string | null;
  favorite: boolean | null;
  assignee: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  minimumOrderQuantity: number | null;
  moqDescription: string | null;
  score: number | null;
  incoTerm: string | null;
  harbour: string | null;
  masterCbm: number | null;
  quantityPer20ft: number | null;
  quantityPer40ft: number | null;
  quantityPer40ftHC: number | null;
  leadTimeValue: number | null;
  leadTimeUnit: string | null;
  sample: boolean | null;
  samplePrice: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  archived: boolean;
  reference: string | null;
  referenceKey: number | null;
  creationDate: number;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  deletedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  deletionDate: number | null;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type UpdateProductMutation = {
  __typename: "Product";
  id: string;
  name: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  price: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  description: string | null;
  favorite: boolean | null;
  assignee: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  minimumOrderQuantity: number | null;
  moqDescription: string | null;
  score: number | null;
  incoTerm: string | null;
  harbour: string | null;
  masterCbm: number | null;
  quantityPer20ft: number | null;
  quantityPer40ft: number | null;
  quantityPer40ftHC: number | null;
  leadTimeValue: number | null;
  leadTimeUnit: string | null;
  sample: boolean | null;
  samplePrice: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  archived: boolean;
  reference: string | null;
  referenceKey: number | null;
  creationDate: number;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  deletedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  deletionDate: number | null;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type DeleteProductMutation = {
  __typename: "Product";
  id: string;
  name: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  price: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  description: string | null;
  favorite: boolean | null;
  assignee: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  minimumOrderQuantity: number | null;
  moqDescription: string | null;
  score: number | null;
  incoTerm: string | null;
  harbour: string | null;
  masterCbm: number | null;
  quantityPer20ft: number | null;
  quantityPer40ft: number | null;
  quantityPer40ftHC: number | null;
  leadTimeValue: number | null;
  leadTimeUnit: string | null;
  sample: boolean | null;
  samplePrice: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  archived: boolean;
  reference: string | null;
  referenceKey: number | null;
  creationDate: number;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  deletedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  deletionDate: number | null;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type CreateSupplierMutation = {
  __typename: "Supplier";
  id: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
};

export type UpdateSupplierMutation = {
  __typename: "Supplier";
  id: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
};

export type DeleteSupplierMutation = {
  __typename: "Supplier";
  id: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
};

export type CreateCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type UpdateCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type DeleteCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type UserQuery = {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  preferredLanguage: Lang | null;
  avatar: string | null;
  creationDate: number | null;
};

export type GetProductQuery = {
  __typename: "Product";
  id: string;
  name: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  price: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  description: string | null;
  favorite: boolean | null;
  assignee: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  minimumOrderQuantity: number | null;
  moqDescription: string | null;
  score: number | null;
  incoTerm: string | null;
  harbour: string | null;
  masterCbm: number | null;
  quantityPer20ft: number | null;
  quantityPer40ft: number | null;
  quantityPer40ftHC: number | null;
  leadTimeValue: number | null;
  leadTimeUnit: string | null;
  sample: boolean | null;
  samplePrice: {
    __typename: "Price";
    id: string;
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  archived: boolean;
  reference: string | null;
  referenceKey: number | null;
  creationDate: number;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  deletedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  deletionDate: number | null;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type ListProductsQuery = {
  __typename: "ModelProductConnection";
  items: Array<{
    __typename: "Product";
    id: string;
    name: string;
    teamId: string;
    description: string | null;
    favorite: boolean | null;
    minimumOrderQuantity: number | null;
    moqDescription: string | null;
    score: number | null;
    incoTerm: string | null;
    harbour: string | null;
    masterCbm: number | null;
    quantityPer20ft: number | null;
    quantityPer40ft: number | null;
    quantityPer40ftHC: number | null;
    leadTimeValue: number | null;
    leadTimeUnit: string | null;
    sample: boolean | null;
    archived: boolean;
    reference: string | null;
    referenceKey: number | null;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  nextToken: string | null;
};

export type GetSupplierQuery = {
  __typename: "Supplier";
  id: string;
  teamId: string;
  team: {
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
};

export type ListSuppliersQuery = {
  __typename: "ModelSupplierConnection";
  items: Array<{
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetTeamQuery = {
  __typename: "Team";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  companyId: string;
  company: {
    __typename: "Company";
    id: string;
    name: string;
    ownerUserId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type ListTeamsQuery = {
  __typename: "ModelTeamConnection";
  items: Array<{
    __typename: "Team";
    id: string;
    name: string;
    ownerUserId: string;
    companyId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetCompanyQuery = {
  __typename: "Company";
  id: string;
  name: string;
  ownerUserId: string;
  owner: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdByUserId: string;
  createdBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  };
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedBy: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
  } | null;
  lastUpdatedOn: number | null;
};

export type ListCompanysQuery = {
  __typename: "ModelCompanyConnection";
  items: Array<{
    __typename: "Company";
    id: string;
    name: string;
    ownerUserId: string;
    createdByUserId: string;
    createdOn: number;
    lastUpdatedByUserId: string;
    lastUpdatedOn: number | null;
  } | null> | null;
  nextToken: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateTeam(input?: CreateTeamInput): Promise<CreateTeamMutation> {
    const statement = `mutation CreateTeam($input: CreateTeamInput) {
        createTeam(input: $input) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          companyId
          company {
            __typename
            id
            name
            ownerUserId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (input) {
      gqlAPIServiceArguments.input = input;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTeamMutation>response.data.createTeam;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          email
          firstName
          lastName
          phoneNumber
          preferredLanguage
          avatar
          creationDate
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async CreateProduct(
    input: CreateProductInput,
    condition?: ModelProductConditionInput
  ): Promise<CreateProductMutation> {
    const statement = `mutation CreateProduct($input: CreateProductInput!, $condition: ModelProductConditionInput) {
        createProduct(input: $input, condition: $condition) {
          __typename
          id
          name
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          price {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          description
          favorite
          assignee {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          minimumOrderQuantity
          moqDescription
          score
          incoTerm
          harbour
          masterCbm
          quantityPer20ft
          quantityPer40ft
          quantityPer40ftHC
          leadTimeValue
          leadTimeUnit
          sample
          samplePrice {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          archived
          reference
          referenceKey
          creationDate
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletionDate
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedDate
          deleted
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateProductMutation>response.data.createProduct;
  }
  async UpdateProduct(
    input: UpdateProductInput,
    condition?: ModelProductConditionInput
  ): Promise<UpdateProductMutation> {
    const statement = `mutation UpdateProduct($input: UpdateProductInput!, $condition: ModelProductConditionInput) {
        updateProduct(input: $input, condition: $condition) {
          __typename
          id
          name
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          price {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          description
          favorite
          assignee {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          minimumOrderQuantity
          moqDescription
          score
          incoTerm
          harbour
          masterCbm
          quantityPer20ft
          quantityPer40ft
          quantityPer40ftHC
          leadTimeValue
          leadTimeUnit
          sample
          samplePrice {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          archived
          reference
          referenceKey
          creationDate
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletionDate
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedDate
          deleted
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateProductMutation>response.data.updateProduct;
  }
  async DeleteProduct(
    input: DeleteProductInput,
    condition?: ModelProductConditionInput
  ): Promise<DeleteProductMutation> {
    const statement = `mutation DeleteProduct($input: DeleteProductInput!, $condition: ModelProductConditionInput) {
        deleteProduct(input: $input, condition: $condition) {
          __typename
          id
          name
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          price {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          description
          favorite
          assignee {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          minimumOrderQuantity
          moqDescription
          score
          incoTerm
          harbour
          masterCbm
          quantityPer20ft
          quantityPer40ft
          quantityPer40ftHC
          leadTimeValue
          leadTimeUnit
          sample
          samplePrice {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          archived
          reference
          referenceKey
          creationDate
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletionDate
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedDate
          deleted
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteProductMutation>response.data.deleteProduct;
  }
  async CreateSupplier(
    input: CreateSupplierInput,
    condition?: ModelSupplierConditionInput
  ): Promise<CreateSupplierMutation> {
    const statement = `mutation CreateSupplier($input: CreateSupplierInput!, $condition: ModelSupplierConditionInput) {
        createSupplier(input: $input, condition: $condition) {
          __typename
          id
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          name
          fullName
          tradingName
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateSupplierMutation>response.data.createSupplier;
  }
  async UpdateSupplier(
    input: UpdateSupplierInput,
    condition?: ModelSupplierConditionInput
  ): Promise<UpdateSupplierMutation> {
    const statement = `mutation UpdateSupplier($input: UpdateSupplierInput!, $condition: ModelSupplierConditionInput) {
        updateSupplier(input: $input, condition: $condition) {
          __typename
          id
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          name
          fullName
          tradingName
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateSupplierMutation>response.data.updateSupplier;
  }
  async DeleteSupplier(
    input: DeleteSupplierInput,
    condition?: ModelSupplierConditionInput
  ): Promise<DeleteSupplierMutation> {
    const statement = `mutation DeleteSupplier($input: DeleteSupplierInput!, $condition: ModelSupplierConditionInput) {
        deleteSupplier(input: $input, condition: $condition) {
          __typename
          id
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          name
          fullName
          tradingName
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteSupplierMutation>response.data.deleteSupplier;
  }
  async CreateCompany(
    input: CreateCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<CreateCompanyMutation> {
    const statement = `mutation CreateCompany($input: CreateCompanyInput!, $condition: ModelCompanyConditionInput) {
        createCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCompanyMutation>response.data.createCompany;
  }
  async UpdateCompany(
    input: UpdateCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<UpdateCompanyMutation> {
    const statement = `mutation UpdateCompany($input: UpdateCompanyInput!, $condition: ModelCompanyConditionInput) {
        updateCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCompanyMutation>response.data.updateCompany;
  }
  async DeleteCompany(
    input: DeleteCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<DeleteCompanyMutation> {
    const statement = `mutation DeleteCompany($input: DeleteCompanyInput!, $condition: ModelCompanyConditionInput) {
        deleteCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCompanyMutation>response.data.deleteCompany;
  }
  async Echo(msg?: string): Promise<string | null> {
    const statement = `query Echo($msg: String) {
        echo(msg: $msg)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (msg) {
      gqlAPIServiceArguments.msg = msg;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data;
  }
  async User(id: string): Promise<UserQuery> {
    const statement = `query User($id: ID!) {
        user(id: $id) {
          __typename
          id
          email
          firstName
          lastName
          phoneNumber
          preferredLanguage
          avatar
          creationDate
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UserQuery>response.data.user;
  }
  async GetProduct(teamId: string, id: string): Promise<GetProductQuery> {
    const statement = `query GetProduct($teamId: ID!, $id: ID!) {
        getProduct(teamId: $teamId, id: $id) {
          __typename
          id
          name
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          price {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          description
          favorite
          assignee {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          minimumOrderQuantity
          moqDescription
          score
          incoTerm
          harbour
          masterCbm
          quantityPer20ft
          quantityPer40ft
          quantityPer40ftHC
          leadTimeValue
          leadTimeUnit
          sample
          samplePrice {
            __typename
            id
            currency
            value
            baseCurrencyValue
          }
          archived
          reference
          referenceKey
          creationDate
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          deletionDate
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedDate
          deleted
        }
      }`;
    const gqlAPIServiceArguments: any = {
      teamId,
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProductQuery>response.data.getProduct;
  }
  async ListProducts(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelProductFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListProductsQuery> {
    const statement = `query ListProducts($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelProductFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listProducts(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            name
            teamId
            description
            favorite
            minimumOrderQuantity
            moqDescription
            score
            incoTerm
            harbour
            masterCbm
            quantityPer20ft
            quantityPer40ft
            quantityPer40ftHC
            leadTimeValue
            leadTimeUnit
            sample
            archived
            reference
            referenceKey
            creationDate
            deletionDate
            lastUpdatedDate
            deleted
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListProductsQuery>response.data.listProducts;
  }
  async GetSupplier(teamId: string, id: string): Promise<GetSupplierQuery> {
    const statement = `query GetSupplier($teamId: ID!, $id: ID!) {
        getSupplier(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          team {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          name
          fullName
          tradingName
        }
      }`;
    const gqlAPIServiceArguments: any = {
      teamId,
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSupplierQuery>response.data.getSupplier;
  }
  async ListSuppliers(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelSupplierFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListSuppliersQuery> {
    const statement = `query ListSuppliers($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelSupplierFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listSuppliers(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSuppliersQuery>response.data.listSuppliers;
  }
  async GetTeam(id: string): Promise<GetTeamQuery> {
    const statement = `query GetTeam($id: ID!) {
        getTeam(id: $id) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          companyId
          company {
            __typename
            id
            name
            ownerUserId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTeamQuery>response.data.getTeam;
  }
  async ListTeams(
    filter?: ModelTeamFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTeamsQuery> {
    const statement = `query ListTeams($filter: ModelTeamFilterInput, $limit: Int, $nextToken: String) {
        listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            ownerUserId
            companyId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTeamsQuery>response.data.listTeams;
  }
  async GetCompany(id: string): Promise<GetCompanyQuery> {
    const statement = `query GetCompany($id: ID!) {
        getCompany(id: $id) {
          __typename
          id
          name
          ownerUserId
          owner {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdByUserId
          createdBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          createdOn
          lastUpdatedByUserId
          lastUpdatedBy {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
          }
          lastUpdatedOn
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCompanyQuery>response.data.getCompany;
  }
  async ListCompanys(
    filter?: ModelCompanyFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCompanysQuery> {
    const statement = `query ListCompanys($filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String) {
        listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            ownerUserId
            createdByUserId
            createdOn
            lastUpdatedByUserId
            lastUpdatedOn
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCompanysQuery>response.data.listCompanys;
  }
}
