/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateTeamInput = {
  name: string;
  companyId: string;
};

export enum Lang {
  EN = "EN",
  FR = "FR",
  CN = "CN"
}

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

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
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

export type CreateDescriptorInput = {
  id: string;
  teamId: string;
  sections?: Array<SectionDescriptorInput | null> | null;
  target?: string | null;
};

export type SectionDescriptorInput = {
  name: string;
  fields?: Array<FieldDescriptorInput | null> | null;
};

export type FieldDescriptorInput = {
  name: string;
  label: string;
  type: string;
  defaultValue?: string | null;
  fixedValue?: boolean | null;
  metadata?: string | null;
};

export type ModelDescriptorConditionInput = {
  target?: ModelStringInput | null;
  and?: Array<ModelDescriptorConditionInput | null> | null;
  or?: Array<ModelDescriptorConditionInput | null> | null;
  not?: ModelDescriptorConditionInput | null;
};

export type UpdateDescriptorInput = {
  id: string;
  teamId: string;
  sections?: Array<SectionDescriptorInput | null> | null;
  target?: string | null;
};

export type DeleteDescriptorInput = {
  teamId: string;
  id: string;
};

export type CreateCategoryInput = {
  id: string;
  teamId: string;
  name: string;
  creationDate: number;
  deletionDate?: number | null;
  lastupdatedByUserId: string;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastupdatedByUserId?: ModelIDInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelCategoryConditionInput | null> | null;
  or?: Array<ModelCategoryConditionInput | null> | null;
  not?: ModelCategoryConditionInput | null;
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

export type UpdateCategoryInput = {
  id: string;
  teamId: string;
  name?: string | null;
  creationDate?: number | null;
  deletionDate?: number | null;
  lastupdatedByUserId?: string | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
};

export type DeleteCategoryInput = {
  teamId: string;
  id: string;
};

export type CreateContactInput = {
  id: string;
  teamId: string;
  companyId?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  creationDate: number;
  deletionDate?: number | null;
  lastUpdatedDate: number;
  deleted: boolean;
  contactSupplierId?: string | null;
};

export type ModelContactConditionInput = {
  companyId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  email?: ModelStringInput | null;
  jobTitle?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelContactConditionInput | null> | null;
  or?: Array<ModelContactConditionInput | null> | null;
  not?: ModelContactConditionInput | null;
};

export type UpdateContactInput = {
  id: string;
  teamId: string;
  companyId?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  creationDate?: number | null;
  deletionDate?: number | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  contactSupplierId?: string | null;
};

export type DeleteContactInput = {
  teamId: string;
  id: string;
};

export type CreateImageInput = {
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls?: Array<ImageUrlInput | null> | null;
  creationDate: number;
  deletionDate?: number | null;
  lastUpdatedDate: number;
  deleted: boolean;
};

export type ImageUrlInput = {
  id: string;
  maxWidth: number;
  maxHeight: number;
  url: string;
};

export type ModelImageConditionInput = {
  fileName?: ModelStringInput | null;
  orientation?: ModelIntInput | null;
  imageType?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelImageConditionInput | null> | null;
  or?: Array<ModelImageConditionInput | null> | null;
  not?: ModelImageConditionInput | null;
};

export type UpdateImageInput = {
  id: string;
  teamId: string;
  fileName?: string | null;
  orientation?: number | null;
  imageType?: string | null;
  urls?: Array<ImageUrlInput | null> | null;
  creationDate?: number | null;
  deletionDate?: number | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
};

export type DeleteImageInput = {
  teamId: string;
  id: string;
};

export type CreateTaskInput = {
  id: string;
  teamId: string;
  name?: string | null;
  description?: string | null;
  dueDate?: number | null;
  completed?: boolean | null;
  completionDate?: number | null;
  assigneeUserId: string;
  reference?: string | null;
  referenceKey?: number | null;
  inProgress?: boolean | null;
  creationDate: number;
  deletionDate?: number | null;
  lastUpdatedDate: number;
  deleted: boolean;
  taskProductId?: string | null;
  taskSupplierId?: string | null;
};

export type ModelTaskConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  dueDate?: ModelIntInput | null;
  completed?: ModelBooleanInput | null;
  completionDate?: ModelIntInput | null;
  assigneeUserId?: ModelIDInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  inProgress?: ModelBooleanInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelTaskConditionInput | null> | null;
  or?: Array<ModelTaskConditionInput | null> | null;
  not?: ModelTaskConditionInput | null;
};

export type UpdateTaskInput = {
  id: string;
  teamId: string;
  name?: string | null;
  description?: string | null;
  dueDate?: number | null;
  completed?: boolean | null;
  completionDate?: number | null;
  assigneeUserId?: string | null;
  reference?: string | null;
  referenceKey?: number | null;
  inProgress?: boolean | null;
  creationDate?: number | null;
  deletionDate?: number | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  taskProductId?: string | null;
  taskSupplierId?: string | null;
};

export type DeleteTaskInput = {
  teamId: string;
  id: string;
};

export type CreateTeamUserInput = {
  teamId: string;
  userId: string;
  role: TeamRole;
};

export enum TeamRole {
  TEAMOWNER = "TEAMOWNER",
  TEAMMEMBER = "TEAMMEMBER",
  TEAMVIEWER = "TEAMVIEWER"
}

export type ModelTeamUserConditionInput = {
  role?: ModelTeamRoleInput | null;
  and?: Array<ModelTeamUserConditionInput | null> | null;
  or?: Array<ModelTeamUserConditionInput | null> | null;
  not?: ModelTeamUserConditionInput | null;
};

export type ModelTeamRoleInput = {
  eq?: TeamRole | null;
  ne?: TeamRole | null;
};

export type UpdateTeamUserInput = {
  teamId: string;
  userId: string;
  role?: TeamRole | null;
};

export type DeleteTeamUserInput = {
  teamId: string;
  userId: string;
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

export type ModelLangInput = {
  eq?: Lang | null;
  ne?: Lang | null;
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

export type ModelDescriptorFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  target?: ModelStringInput | null;
  and?: Array<ModelDescriptorFilterInput | null> | null;
  or?: Array<ModelDescriptorFilterInput | null> | null;
  not?: ModelDescriptorFilterInput | null;
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastupdatedByUserId?: ModelIDInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelCategoryFilterInput | null> | null;
  or?: Array<ModelCategoryFilterInput | null> | null;
  not?: ModelCategoryFilterInput | null;
};

export type ModelContactFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  companyId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  email?: ModelStringInput | null;
  jobTitle?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelContactFilterInput | null> | null;
  or?: Array<ModelContactFilterInput | null> | null;
  not?: ModelContactFilterInput | null;
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  fileName?: ModelStringInput | null;
  orientation?: ModelIntInput | null;
  imageType?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelImageFilterInput | null> | null;
  or?: Array<ModelImageFilterInput | null> | null;
  not?: ModelImageFilterInput | null;
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  dueDate?: ModelIntInput | null;
  completed?: ModelBooleanInput | null;
  completionDate?: ModelIntInput | null;
  assigneeUserId?: ModelIDInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  inProgress?: ModelBooleanInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelTaskFilterInput | null> | null;
  or?: Array<ModelTaskFilterInput | null> | null;
  not?: ModelTaskFilterInput | null;
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

export type ModelTeamUserFilterInput = {
  teamId?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  role?: ModelTeamRoleInput | null;
  and?: Array<ModelTeamUserFilterInput | null> | null;
  or?: Array<ModelTeamUserFilterInput | null> | null;
  not?: ModelTeamUserFilterInput | null;
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
  images: Array<{
    __typename: "Image";
    id: string;
    teamId: string;
    fileName: string;
    orientation: number;
    imageType: string;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  price: {
    __typename: "Price";
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  category: {
    __typename: "Category";
    id: string;
    teamId: string;
    name: string;
    creationDate: number;
    deletionDate: number | null;
    lastupdatedByUserId: string;
    lastUpdatedDate: number;
    deleted: boolean;
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
  images: Array<{
    __typename: "Image";
    id: string;
    teamId: string;
    fileName: string;
    orientation: number;
    imageType: string;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  price: {
    __typename: "Price";
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  category: {
    __typename: "Category";
    id: string;
    teamId: string;
    name: string;
    creationDate: number;
    deletionDate: number | null;
    lastupdatedByUserId: string;
    lastUpdatedDate: number;
    deleted: boolean;
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
  images: Array<{
    __typename: "Image";
    id: string;
    teamId: string;
    fileName: string;
    orientation: number;
    imageType: string;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  price: {
    __typename: "Price";
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  category: {
    __typename: "Category";
    id: string;
    teamId: string;
    name: string;
    creationDate: number;
    deletionDate: number | null;
    lastupdatedByUserId: string;
    lastUpdatedDate: number;
    deleted: boolean;
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

export type CreateDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type UpdateDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type DeleteDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type CreateCategoryMutation = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type UpdateCategoryMutation = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type DeleteCategoryMutation = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type CreateContactMutation = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type UpdateContactMutation = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type DeleteContactMutation = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type CreateImageMutation = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type UpdateImageMutation = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type DeleteImageMutation = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type CreateTaskMutation = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type UpdateTaskMutation = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type DeleteTaskMutation = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type CreateTeamUserMutation = {
  __typename: "TeamUser";
  teamId: string;
  userId: string;
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
  } | null;
  user: {
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
  role: TeamRole;
};

export type UpdateTeamUserMutation = {
  __typename: "TeamUser";
  teamId: string;
  userId: string;
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
  } | null;
  user: {
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
  role: TeamRole;
};

export type DeleteTeamUserMutation = {
  __typename: "TeamUser";
  teamId: string;
  userId: string;
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
  } | null;
  user: {
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
  role: TeamRole;
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

export type GetStreamTokenQuery = {
  __typename: "GetStreamToken";
  token: string;
  feedName: string;
  feedId: string;
};

export type GetStreamNotificationTokenQuery = {
  __typename: "GetStreamToken";
  token: string;
  feedName: string;
  feedId: string;
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
  images: Array<{
    __typename: "Image";
    id: string;
    teamId: string;
    fileName: string;
    orientation: number;
    imageType: string;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  price: {
    __typename: "Price";
    currency: string | null;
    value: number | null;
    baseCurrencyValue: number | null;
  } | null;
  category: {
    __typename: "Category";
    id: string;
    teamId: string;
    name: string;
    creationDate: number;
    deletionDate: number | null;
    lastupdatedByUserId: string;
    lastUpdatedDate: number;
    deleted: boolean;
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

export type GetDescriptorQuery = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type ListDescriptorsQuery = {
  __typename: "ModelDescriptorConnection";
  items: Array<{
    __typename: "Descriptor";
    id: string;
    teamId: string;
    target: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetCategoryQuery = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type ListCategorysQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
    __typename: "Category";
    id: string;
    teamId: string;
    name: string;
    creationDate: number;
    deletionDate: number | null;
    lastupdatedByUserId: string;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  nextToken: string | null;
};

export type GetContactQuery = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type ListContactsQuery = {
  __typename: "ModelContactConnection";
  items: Array<{
    __typename: "Contact";
    id: string;
    teamId: string;
    companyId: string | null;
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
    jobTitle: string | null;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  nextToken: string | null;
};

export type GetImageQuery = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type ListImagesQuery = {
  __typename: "ModelImageConnection";
  items: Array<{
    __typename: "Image";
    id: string;
    teamId: string;
    fileName: string;
    orientation: number;
    imageType: string;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
  } | null> | null;
  nextToken: string | null;
};

export type GetTaskQuery = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type ListTasksQuery = {
  __typename: "ModelTaskConnection";
  items: Array<{
    __typename: "Task";
    id: string;
    teamId: string;
    name: string | null;
    description: string | null;
    dueDate: number | null;
    completed: boolean | null;
    completionDate: number | null;
    assigneeUserId: string;
    reference: string | null;
    referenceKey: number | null;
    inProgress: boolean | null;
    creationDate: number;
    deletionDate: number | null;
    lastUpdatedDate: number;
    deleted: boolean;
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

export type GetTeamUserQuery = {
  __typename: "TeamUser";
  teamId: string;
  userId: string;
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
  } | null;
  user: {
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
  role: TeamRole;
};

export type ListTeamUsersQuery = {
  __typename: "ModelTeamUserConnection";
  items: Array<{
    __typename: "TeamUser";
    teamId: string;
    userId: string;
    role: TeamRole;
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

export type ListTeamUserByUserQuery = {
  __typename: "ModelTeamUserConnection";
  items: Array<{
    __typename: "TeamUser";
    teamId: string;
    userId: string;
    role: TeamRole;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type OnUpdateDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type OnDeleteDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
  } | null> | null;
  target: string | null;
};

export type OnCreateCategorySubscription = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type OnUpdateCategorySubscription = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type OnDeleteCategorySubscription = {
  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
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
  lastupdatedByUserId: string;
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

export type OnCreateContactSubscription = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type OnUpdateContactSubscription = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type OnDeleteContactSubscription = {
  __typename: "Contact";
  id: string;
  teamId: string;
  companyId: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  jobTitle: string | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
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

export type OnCreateImageSubscription = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type OnUpdateImageSubscription = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type OnDeleteImageSubscription = {
  __typename: "Image";
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls: Array<{
    __typename: "ImageUrl";
    id: string;
    maxWidth: number;
    maxHeight: number;
    url: string;
  } | null> | null;
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

export type OnCreateTaskSubscription = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type OnUpdateTaskSubscription = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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

export type OnDeleteTaskSubscription = {
  __typename: "Task";
  id: string;
  teamId: string;
  name: string | null;
  description: string | null;
  dueDate: number | null;
  completed: boolean | null;
  completionDate: number | null;
  assigneeUserId: string;
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
  product: {
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
  } | null;
  supplier: {
    __typename: "Supplier";
    id: string;
    teamId: string;
    name: string;
    fullName: string | null;
    tradingName: string | null;
  } | null;
  reference: string | null;
  referenceKey: number | null;
  inProgress: boolean | null;
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
          images {
            __typename
            id
            teamId
            fileName
            orientation
            imageType
            creationDate
            deletionDate
            lastUpdatedDate
            deleted
          }
          price {
            __typename
            currency
            value
            baseCurrencyValue
          }
          category {
            __typename
            id
            teamId
            name
            creationDate
            deletionDate
            lastupdatedByUserId
            lastUpdatedDate
            deleted
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
          images {
            __typename
            id
            teamId
            fileName
            orientation
            imageType
            creationDate
            deletionDate
            lastUpdatedDate
            deleted
          }
          price {
            __typename
            currency
            value
            baseCurrencyValue
          }
          category {
            __typename
            id
            teamId
            name
            creationDate
            deletionDate
            lastupdatedByUserId
            lastUpdatedDate
            deleted
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
          images {
            __typename
            id
            teamId
            fileName
            orientation
            imageType
            creationDate
            deletionDate
            lastUpdatedDate
            deleted
          }
          price {
            __typename
            currency
            value
            baseCurrencyValue
          }
          category {
            __typename
            id
            teamId
            name
            creationDate
            deletionDate
            lastupdatedByUserId
            lastUpdatedDate
            deleted
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
  async CreateDescriptor(
    input: CreateDescriptorInput,
    condition?: ModelDescriptorConditionInput
  ): Promise<CreateDescriptorMutation> {
    const statement = `mutation CreateDescriptor($input: CreateDescriptorInput!, $condition: ModelDescriptorConditionInput) {
        createDescriptor(input: $input, condition: $condition) {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
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
    return <CreateDescriptorMutation>response.data.createDescriptor;
  }
  async UpdateDescriptor(
    input: UpdateDescriptorInput,
    condition?: ModelDescriptorConditionInput
  ): Promise<UpdateDescriptorMutation> {
    const statement = `mutation UpdateDescriptor($input: UpdateDescriptorInput!, $condition: ModelDescriptorConditionInput) {
        updateDescriptor(input: $input, condition: $condition) {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
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
    return <UpdateDescriptorMutation>response.data.updateDescriptor;
  }
  async DeleteDescriptor(
    input: DeleteDescriptorInput,
    condition?: ModelDescriptorConditionInput
  ): Promise<DeleteDescriptorMutation> {
    const statement = `mutation DeleteDescriptor($input: DeleteDescriptorInput!, $condition: ModelDescriptorConditionInput) {
        deleteDescriptor(input: $input, condition: $condition) {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
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
    return <DeleteDescriptorMutation>response.data.deleteDescriptor;
  }
  async CreateCategory(
    input: CreateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<CreateCategoryMutation> {
    const statement = `mutation CreateCategory($input: CreateCategoryInput!, $condition: ModelCategoryConditionInput) {
        createCategory(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
    return <CreateCategoryMutation>response.data.createCategory;
  }
  async UpdateCategory(
    input: UpdateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<UpdateCategoryMutation> {
    const statement = `mutation UpdateCategory($input: UpdateCategoryInput!, $condition: ModelCategoryConditionInput) {
        updateCategory(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
    return <UpdateCategoryMutation>response.data.updateCategory;
  }
  async DeleteCategory(
    input: DeleteCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<DeleteCategoryMutation> {
    const statement = `mutation DeleteCategory($input: DeleteCategoryInput!, $condition: ModelCategoryConditionInput) {
        deleteCategory(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
    return <DeleteCategoryMutation>response.data.deleteCategory;
  }
  async CreateContact(
    input: CreateContactInput,
    condition?: ModelContactConditionInput
  ): Promise<CreateContactMutation> {
    const statement = `mutation CreateContact($input: CreateContactInput!, $condition: ModelContactConditionInput) {
        createContact(input: $input, condition: $condition) {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
    return <CreateContactMutation>response.data.createContact;
  }
  async UpdateContact(
    input: UpdateContactInput,
    condition?: ModelContactConditionInput
  ): Promise<UpdateContactMutation> {
    const statement = `mutation UpdateContact($input: UpdateContactInput!, $condition: ModelContactConditionInput) {
        updateContact(input: $input, condition: $condition) {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
    return <UpdateContactMutation>response.data.updateContact;
  }
  async DeleteContact(
    input: DeleteContactInput,
    condition?: ModelContactConditionInput
  ): Promise<DeleteContactMutation> {
    const statement = `mutation DeleteContact($input: DeleteContactInput!, $condition: ModelContactConditionInput) {
        deleteContact(input: $input, condition: $condition) {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
    return <DeleteContactMutation>response.data.deleteContact;
  }
  async CreateImage(
    input: CreateImageInput,
    condition?: ModelImageConditionInput
  ): Promise<CreateImageMutation> {
    const statement = `mutation CreateImage($input: CreateImageInput!, $condition: ModelImageConditionInput) {
        createImage(input: $input, condition: $condition) {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
    return <CreateImageMutation>response.data.createImage;
  }
  async UpdateImage(
    input: UpdateImageInput,
    condition?: ModelImageConditionInput
  ): Promise<UpdateImageMutation> {
    const statement = `mutation UpdateImage($input: UpdateImageInput!, $condition: ModelImageConditionInput) {
        updateImage(input: $input, condition: $condition) {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
    return <UpdateImageMutation>response.data.updateImage;
  }
  async DeleteImage(
    input: DeleteImageInput,
    condition?: ModelImageConditionInput
  ): Promise<DeleteImageMutation> {
    const statement = `mutation DeleteImage($input: DeleteImageInput!, $condition: ModelImageConditionInput) {
        deleteImage(input: $input, condition: $condition) {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
    return <DeleteImageMutation>response.data.deleteImage;
  }
  async CreateTask(
    input: CreateTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<CreateTaskMutation> {
    const statement = `mutation CreateTask($input: CreateTaskInput!, $condition: ModelTaskConditionInput) {
        createTask(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
    return <CreateTaskMutation>response.data.createTask;
  }
  async UpdateTask(
    input: UpdateTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<UpdateTaskMutation> {
    const statement = `mutation UpdateTask($input: UpdateTaskInput!, $condition: ModelTaskConditionInput) {
        updateTask(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
    return <UpdateTaskMutation>response.data.updateTask;
  }
  async DeleteTask(
    input: DeleteTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<DeleteTaskMutation> {
    const statement = `mutation DeleteTask($input: DeleteTaskInput!, $condition: ModelTaskConditionInput) {
        deleteTask(input: $input, condition: $condition) {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
    return <DeleteTaskMutation>response.data.deleteTask;
  }
  async CreateTeamUser(
    input: CreateTeamUserInput,
    condition?: ModelTeamUserConditionInput
  ): Promise<CreateTeamUserMutation> {
    const statement = `mutation CreateTeamUser($input: CreateTeamUserInput!, $condition: ModelTeamUserConditionInput) {
        createTeamUser(input: $input, condition: $condition) {
          __typename
          teamId
          userId
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
          user {
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
          role
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
    return <CreateTeamUserMutation>response.data.createTeamUser;
  }
  async UpdateTeamUser(
    input: UpdateTeamUserInput,
    condition?: ModelTeamUserConditionInput
  ): Promise<UpdateTeamUserMutation> {
    const statement = `mutation UpdateTeamUser($input: UpdateTeamUserInput!, $condition: ModelTeamUserConditionInput) {
        updateTeamUser(input: $input, condition: $condition) {
          __typename
          teamId
          userId
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
          user {
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
          role
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
    return <UpdateTeamUserMutation>response.data.updateTeamUser;
  }
  async DeleteTeamUser(
    input: DeleteTeamUserInput,
    condition?: ModelTeamUserConditionInput
  ): Promise<DeleteTeamUserMutation> {
    const statement = `mutation DeleteTeamUser($input: DeleteTeamUserInput!, $condition: ModelTeamUserConditionInput) {
        deleteTeamUser(input: $input, condition: $condition) {
          __typename
          teamId
          userId
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
          user {
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
          role
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
    return <DeleteTeamUserMutation>response.data.deleteTeamUser;
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
  async GetStreamToken(teamId?: string): Promise<GetStreamTokenQuery> {
    const statement = `query GetStreamToken($teamId: String) {
        getStreamToken(teamId: $teamId) {
          __typename
          token
          feedName
          feedId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetStreamTokenQuery>response.data.getStreamToken;
  }
  async GetStreamNotificationToken(
    teamId?: string
  ): Promise<GetStreamNotificationTokenQuery> {
    const statement = `query GetStreamNotificationToken($teamId: String) {
        getStreamNotificationToken(teamId: $teamId) {
          __typename
          token
          feedName
          feedId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetStreamNotificationTokenQuery>(
      response.data.getStreamNotificationToken
    );
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
          images {
            __typename
            id
            teamId
            fileName
            orientation
            imageType
            creationDate
            deletionDate
            lastUpdatedDate
            deleted
          }
          price {
            __typename
            currency
            value
            baseCurrencyValue
          }
          category {
            __typename
            id
            teamId
            name
            creationDate
            deletionDate
            lastupdatedByUserId
            lastUpdatedDate
            deleted
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
  async GetDescriptor(teamId: string, id: string): Promise<GetDescriptorQuery> {
    const statement = `query GetDescriptor($teamId: ID!, $id: ID!) {
        getDescriptor(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
        }
      }`;
    const gqlAPIServiceArguments: any = {
      teamId,
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetDescriptorQuery>response.data.getDescriptor;
  }
  async ListDescriptors(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelDescriptorFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListDescriptorsQuery> {
    const statement = `query ListDescriptors($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelDescriptorFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listDescriptors(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            target
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
    return <ListDescriptorsQuery>response.data.listDescriptors;
  }
  async GetCategory(teamId: string, id: string): Promise<GetCategoryQuery> {
    const statement = `query GetCategory($teamId: ID!, $id: ID!) {
        getCategory(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
    return <GetCategoryQuery>response.data.getCategory;
  }
  async ListCategorys(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListCategorysQuery> {
    const statement = `query ListCategorys($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listCategorys(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            name
            creationDate
            deletionDate
            lastupdatedByUserId
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
    return <ListCategorysQuery>response.data.listCategorys;
  }
  async GetContact(teamId: string, id: string): Promise<GetContactQuery> {
    const statement = `query GetContact($teamId: ID!, $id: ID!) {
        getContact(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
    return <GetContactQuery>response.data.getContact;
  }
  async ListContacts(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelContactFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListContactsQuery> {
    const statement = `query ListContacts($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelContactFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listContacts(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            companyId
            name
            phoneNumber
            email
            jobTitle
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
    return <ListContactsQuery>response.data.listContacts;
  }
  async GetImage(teamId: string, id: string): Promise<GetImageQuery> {
    const statement = `query GetImage($teamId: ID!, $id: ID!) {
        getImage(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
    return <GetImageQuery>response.data.getImage;
  }
  async ListImages(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelImageFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListImagesQuery> {
    const statement = `query ListImages($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelImageFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listImages(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            fileName
            orientation
            imageType
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
    return <ListImagesQuery>response.data.listImages;
  }
  async GetTask(teamId: string, id: string): Promise<GetTaskQuery> {
    const statement = `query GetTask($teamId: ID!, $id: ID!) {
        getTask(teamId: $teamId, id: $id) {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
    return <GetTaskQuery>response.data.getTask;
  }
  async ListTasks(
    teamId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelTaskFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListTasksQuery> {
    const statement = `query ListTasks($teamId: ID, $id: ModelIDKeyConditionInput, $filter: ModelTaskFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listTasks(teamId: $teamId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            teamId
            name
            description
            dueDate
            completed
            completionDate
            assigneeUserId
            reference
            referenceKey
            inProgress
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
    return <ListTasksQuery>response.data.listTasks;
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
  async GetTeamUser(teamId: string, userId: string): Promise<GetTeamUserQuery> {
    const statement = `query GetTeamUser($teamId: ID!, $userId: ID!) {
        getTeamUser(teamId: $teamId, userId: $userId) {
          __typename
          teamId
          userId
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
          user {
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
          role
        }
      }`;
    const gqlAPIServiceArguments: any = {
      teamId,
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTeamUserQuery>response.data.getTeamUser;
  }
  async ListTeamUsers(
    teamId?: string,
    userId?: ModelIDKeyConditionInput,
    filter?: ModelTeamUserFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListTeamUsersQuery> {
    const statement = `query ListTeamUsers($teamId: ID, $userId: ModelIDKeyConditionInput, $filter: ModelTeamUserFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listTeamUsers(teamId: $teamId, userId: $userId, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            teamId
            userId
            role
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    if (userId) {
      gqlAPIServiceArguments.userId = userId;
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
    return <ListTeamUsersQuery>response.data.listTeamUsers;
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
  async ListTeamUserByUser(
    userId?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelTeamUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTeamUserByUserQuery> {
    const statement = `query ListTeamUserByUser($userId: ID, $sortDirection: ModelSortDirection, $filter: ModelTeamUserFilterInput, $limit: Int, $nextToken: String) {
        listTeamUserByUser(userId: $userId, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            teamId
            userId
            role
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (userId) {
      gqlAPIServiceArguments.userId = userId;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTeamUserByUserQuery>response.data.listTeamUserByUser;
  }
  OnCreateDescriptorListener: Observable<
    OnCreateDescriptorSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateDescriptor {
        onCreateDescriptor {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
        }
      }`
    )
  ) as Observable<OnCreateDescriptorSubscription>;

  OnUpdateDescriptorListener: Observable<
    OnUpdateDescriptorSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateDescriptor {
        onUpdateDescriptor {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
        }
      }`
    )
  ) as Observable<OnUpdateDescriptorSubscription>;

  OnDeleteDescriptorListener: Observable<
    OnDeleteDescriptorSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteDescriptor {
        onDeleteDescriptor {
          __typename
          id
          teamId
          sections {
            __typename
            name
          }
          target
        }
      }`
    )
  ) as Observable<OnDeleteDescriptorSubscription>;

  OnCreateCategoryListener: Observable<
    OnCreateCategorySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCategory {
        onCreateCategory {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
      }`
    )
  ) as Observable<OnCreateCategorySubscription>;

  OnUpdateCategoryListener: Observable<
    OnUpdateCategorySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCategory {
        onUpdateCategory {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
      }`
    )
  ) as Observable<OnUpdateCategorySubscription>;

  OnDeleteCategoryListener: Observable<
    OnDeleteCategorySubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCategory {
        onDeleteCategory {
          __typename
          id
          teamId
          name
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
          lastupdatedByUserId
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
      }`
    )
  ) as Observable<OnDeleteCategorySubscription>;

  OnCreateContactListener: Observable<
    OnCreateContactSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateContact {
        onCreateContact {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
      }`
    )
  ) as Observable<OnCreateContactSubscription>;

  OnUpdateContactListener: Observable<
    OnUpdateContactSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateContact {
        onUpdateContact {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
      }`
    )
  ) as Observable<OnUpdateContactSubscription>;

  OnDeleteContactListener: Observable<
    OnDeleteContactSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteContact {
        onDeleteContact {
          __typename
          id
          teamId
          companyId
          name
          phoneNumber
          email
          jobTitle
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
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
      }`
    )
  ) as Observable<OnDeleteContactSubscription>;

  OnCreateImageListener: Observable<OnCreateImageSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateImage {
        onCreateImage {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
      }`
    )
  ) as Observable<OnCreateImageSubscription>;

  OnUpdateImageListener: Observable<OnUpdateImageSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateImage {
        onUpdateImage {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
      }`
    )
  ) as Observable<OnUpdateImageSubscription>;

  OnDeleteImageListener: Observable<OnDeleteImageSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteImage {
        onDeleteImage {
          __typename
          id
          teamId
          fileName
          orientation
          imageType
          urls {
            __typename
            id
            maxWidth
            maxHeight
            url
          }
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
      }`
    )
  ) as Observable<OnDeleteImageSubscription>;

  OnCreateTaskListener: Observable<OnCreateTaskSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateTask {
        onCreateTask {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
      }`
    )
  ) as Observable<OnCreateTaskSubscription>;

  OnUpdateTaskListener: Observable<OnUpdateTaskSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTask {
        onUpdateTask {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
      }`
    )
  ) as Observable<OnUpdateTaskSubscription>;

  OnDeleteTaskListener: Observable<OnDeleteTaskSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTask {
        onDeleteTask {
          __typename
          id
          teamId
          name
          description
          dueDate
          completed
          completionDate
          assigneeUserId
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
          product {
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
          supplier {
            __typename
            id
            teamId
            name
            fullName
            tradingName
          }
          reference
          referenceKey
          inProgress
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
      }`
    )
  ) as Observable<OnDeleteTaskSubscription>;
}
