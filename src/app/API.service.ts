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

export type CreateTeamUserInput = {
  teamId: string;
  userId: string;
  team?: TeamInput | null;
  role: TeamRole;
  _version?: number | null;
};

export type TeamInput = {
  id: string;
  name: string;
  ownerUserId: string;
  companyId: string;
  createdByUserId: string;
  createdOn: number;
  lastUpdatedByUserId: string;
  lastUpdatedOn?: number | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
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
  team?: TeamInput | null;
  role?: TeamRole | null;
  _version?: number | null;
};

export type DeleteTeamUserInput = {
  teamId: string;
  userId: string;
  _version?: number | null;
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

export type UpdateCompanyInput = {
  id: string;
  name?: string | null;
  ownerUserId?: string | null;
  createdByUserId?: string | null;
  createdOn?: number | null;
  lastUpdatedByUserId?: string | null;
  lastUpdatedOn?: number | null;
  _version?: number | null;
};

export type DeleteCompanyInput = {
  id: string;
  _version?: number | null;
};

export type CreateProductInput = {
  id?: string | null;
  name: string;
  teamId: string;
  team: TeamInput;
  price?: PriceInput | null;
  description?: string | null;
  favorite?: boolean | null;
  assignee?: UserInput | null;
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
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
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

export type UserInput = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  preferredLanguage?: Lang | null;
  avatar?: string | null;
  creationDate?: number | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelProductConditionInput = {
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
  teamId?: string | null;
  team?: TeamInput | null;
  price?: PriceInput | null;
  description?: string | null;
  favorite?: boolean | null;
  assignee?: UserInput | null;
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
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
  productSupplierId?: string | null;
  productAssigneeId?: string | null;
  productCreatedById?: string | null;
  productDeletedById?: string | null;
};

export type DeleteProductInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateSupplierInput = {
  id?: string | null;
  teamId: string;
  team: TeamInput;
  name: string;
  fullName?: string | null;
  tradingName?: string | null;
  description?: string | null;
  website?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  officeEmail?: string | null;
  officePhone?: string | null;
  incoTerm?: string | null;
  harbour?: string | null;
  generalMOQ?: number | null;
  generalLeadTime?: number | null;
  favorite: boolean;
  globalDatabaseId?: string | null;
  reference?: string | null;
  referenceKey?: number | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
};

export type ModelSupplierConditionInput = {
  teamId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  tradingName?: ModelStringInput | null;
  description?: ModelStringInput | null;
  website?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  country?: ModelStringInput | null;
  city?: ModelStringInput | null;
  address?: ModelStringInput | null;
  officeEmail?: ModelStringInput | null;
  officePhone?: ModelStringInput | null;
  incoTerm?: ModelStringInput | null;
  harbour?: ModelStringInput | null;
  generalMOQ?: ModelIntInput | null;
  generalLeadTime?: ModelIntInput | null;
  favorite?: ModelBooleanInput | null;
  globalDatabaseId?: ModelStringInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
  and?: Array<ModelSupplierConditionInput | null> | null;
  or?: Array<ModelSupplierConditionInput | null> | null;
  not?: ModelSupplierConditionInput | null;
};

export type UpdateSupplierInput = {
  id: string;
  teamId?: string | null;
  team?: TeamInput | null;
  name?: string | null;
  fullName?: string | null;
  tradingName?: string | null;
  description?: string | null;
  website?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  officeEmail?: string | null;
  officePhone?: string | null;
  incoTerm?: string | null;
  harbour?: string | null;
  generalMOQ?: number | null;
  generalLeadTime?: number | null;
  favorite?: boolean | null;
  globalDatabaseId?: string | null;
  reference?: string | null;
  referenceKey?: number | null;
  creationDate?: number | null;
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
};

export type DeleteSupplierInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateDescriptorInput = {
  id?: string | null;
  teamId: string;
  sections?: Array<SectionDescriptorInput | null> | null;
  target?: string | null;
  _version?: number | null;
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
  teamId?: ModelIDInput | null;
  target?: ModelStringInput | null;
  and?: Array<ModelDescriptorConditionInput | null> | null;
  or?: Array<ModelDescriptorConditionInput | null> | null;
  not?: ModelDescriptorConditionInput | null;
};

export type UpdateDescriptorInput = {
  id: string;
  teamId?: string | null;
  sections?: Array<SectionDescriptorInput | null> | null;
  target?: string | null;
  _version?: number | null;
};

export type DeleteDescriptorInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateCategoryInput = {
  id?: string | null;
  teamId: string;
  name: string;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastupdatedByUserId: string;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
};

export type ModelCategoryConditionInput = {
  teamId?: ModelIDInput | null;
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

export type UpdateCategoryInput = {
  id: string;
  teamId?: string | null;
  name?: string | null;
  creationDate?: number | null;
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastupdatedByUserId?: string | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
};

export type DeleteCategoryInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateContactInput = {
  id?: string | null;
  teamId: string;
  companyId?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  supplier?: SupplierInput | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
  contactSupplierId?: string | null;
};

export type SupplierInput = {
  id: string;
  teamId: string;
  team: TeamInput;
  name: string;
  fullName?: string | null;
  tradingName?: string | null;
  description?: string | null;
  website?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  officeEmail?: string | null;
  officePhone?: string | null;
  incoTerm?: string | null;
  harbour?: string | null;
  generalMOQ?: number | null;
  generalLeadTime?: number | null;
  favorite: boolean;
  globalDatabaseId?: string | null;
  reference?: string | null;
  referenceKey?: number | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelContactConditionInput = {
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
  and?: Array<ModelContactConditionInput | null> | null;
  or?: Array<ModelContactConditionInput | null> | null;
  not?: ModelContactConditionInput | null;
};

export type UpdateContactInput = {
  id: string;
  teamId?: string | null;
  companyId?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  supplier?: SupplierInput | null;
  creationDate?: number | null;
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
  contactSupplierId?: string | null;
};

export type DeleteContactInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateImageInput = {
  id?: string | null;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls?: Array<ImageUrlInput | null> | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
};

export type ImageUrlInput = {
  id: string;
  maxWidth: number;
  maxHeight: number;
  url: string;
};

export type ModelImageConditionInput = {
  teamId?: ModelIDInput | null;
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
  teamId?: string | null;
  fileName?: string | null;
  orientation?: number | null;
  imageType?: string | null;
  urls?: Array<ImageUrlInput | null> | null;
  creationDate?: number | null;
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
};

export type DeleteImageInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateTaskInput = {
  id?: string | null;
  teamId: string;
  name?: string | null;
  description?: string | null;
  dueDate?: number | null;
  completed?: boolean | null;
  completionDate?: number | null;
  assigneeUserId: string;
  assignee?: UserInput | null;
  product?: ProductInput | null;
  supplier?: SupplierInput | null;
  reference?: string | null;
  referenceKey?: number | null;
  inProgress?: boolean | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version?: number | null;
  taskProductId?: string | null;
  taskSupplierId?: string | null;
};

export type ProductInput = {
  id: string;
  name: string;
  teamId: string;
  team: TeamInput;
  supplier?: SupplierInput | null;
  images?: Array<ImageInput | null> | null;
  price?: PriceInput | null;
  category?: CategoryInput | null;
  description?: string | null;
  favorite?: boolean | null;
  assignee?: UserInput | null;
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
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ImageInput = {
  id: string;
  teamId: string;
  fileName: string;
  orientation: number;
  imageType: string;
  urls?: Array<ImageUrlInput | null> | null;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CategoryInput = {
  id: string;
  teamId: string;
  name: string;
  creationDate: number;
  createdBy: UserInput;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastupdatedByUserId: string;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelTaskConditionInput = {
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
  and?: Array<ModelTaskConditionInput | null> | null;
  or?: Array<ModelTaskConditionInput | null> | null;
  not?: ModelTaskConditionInput | null;
};

export type UpdateTaskInput = {
  id: string;
  teamId?: string | null;
  name?: string | null;
  description?: string | null;
  dueDate?: number | null;
  completed?: boolean | null;
  completionDate?: number | null;
  assigneeUserId?: string | null;
  assignee?: UserInput | null;
  product?: ProductInput | null;
  supplier?: SupplierInput | null;
  reference?: string | null;
  referenceKey?: number | null;
  inProgress?: boolean | null;
  creationDate?: number | null;
  createdBy?: UserInput | null;
  deletedBy?: UserInput | null;
  deletionDate?: number | null;
  lastUpdatedBy?: UserInput | null;
  lastUpdatedDate?: number | null;
  deleted?: boolean | null;
  _version?: number | null;
  taskProductId?: string | null;
  taskSupplierId?: string | null;
};

export type DeleteTaskInput = {
  id?: string | null;
  _version?: number | null;
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  preferredLanguage?: ModelLangInput | null;
  avatar?: ModelStringInput | null;
  creationDate?: ModelIntInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelLangInput = {
  eq?: Lang | null;
  ne?: Lang | null;
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

export type ModelSupplierFilterInput = {
  id?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  fullName?: ModelStringInput | null;
  tradingName?: ModelStringInput | null;
  description?: ModelStringInput | null;
  website?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  country?: ModelStringInput | null;
  city?: ModelStringInput | null;
  address?: ModelStringInput | null;
  officeEmail?: ModelStringInput | null;
  officePhone?: ModelStringInput | null;
  incoTerm?: ModelStringInput | null;
  harbour?: ModelStringInput | null;
  generalMOQ?: ModelIntInput | null;
  generalLeadTime?: ModelIntInput | null;
  favorite?: ModelBooleanInput | null;
  globalDatabaseId?: ModelStringInput | null;
  reference?: ModelStringInput | null;
  referenceKey?: ModelIntInput | null;
  creationDate?: ModelIntInput | null;
  deletionDate?: ModelIntInput | null;
  lastUpdatedDate?: ModelIntInput | null;
  deleted?: ModelBooleanInput | null;
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

export type SearchableProductFilterInput = {
  id?: SearchableIDFilterInput | null;
  name?: SearchableStringFilterInput | null;
  teamId?: SearchableIDFilterInput | null;
  description?: SearchableStringFilterInput | null;
  favorite?: SearchableBooleanFilterInput | null;
  minimumOrderQuantity?: SearchableIntFilterInput | null;
  moqDescription?: SearchableStringFilterInput | null;
  score?: SearchableIntFilterInput | null;
  incoTerm?: SearchableStringFilterInput | null;
  harbour?: SearchableStringFilterInput | null;
  masterCbm?: SearchableFloatFilterInput | null;
  quantityPer20ft?: SearchableIntFilterInput | null;
  quantityPer40ft?: SearchableIntFilterInput | null;
  quantityPer40ftHC?: SearchableIntFilterInput | null;
  leadTimeValue?: SearchableIntFilterInput | null;
  leadTimeUnit?: SearchableStringFilterInput | null;
  sample?: SearchableBooleanFilterInput | null;
  archived?: SearchableBooleanFilterInput | null;
  reference?: SearchableStringFilterInput | null;
  referenceKey?: SearchableIntFilterInput | null;
  creationDate?: SearchableIntFilterInput | null;
  deletionDate?: SearchableIntFilterInput | null;
  lastUpdatedDate?: SearchableIntFilterInput | null;
  deleted?: SearchableBooleanFilterInput | null;
  and?: Array<SearchableProductFilterInput | null> | null;
  or?: Array<SearchableProductFilterInput | null> | null;
  not?: SearchableProductFilterInput | null;
};

export type SearchableIDFilterInput = {
  ne?: string | null;
  gt?: string | null;
  lt?: string | null;
  gte?: string | null;
  lte?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
};

export type SearchableStringFilterInput = {
  ne?: string | null;
  gt?: string | null;
  lt?: string | null;
  gte?: string | null;
  lte?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
};

export type SearchableBooleanFilterInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type SearchableIntFilterInput = {
  ne?: number | null;
  gt?: number | null;
  lt?: number | null;
  gte?: number | null;
  lte?: number | null;
  eq?: number | null;
  range?: Array<number | null> | null;
};

export type SearchableFloatFilterInput = {
  ne?: number | null;
  gt?: number | null;
  lt?: number | null;
  gte?: number | null;
  lte?: number | null;
  eq?: number | null;
  range?: Array<number | null> | null;
};

export type SearchableProductSortInput = {
  field?: SearchableProductSortableFields | null;
  direction?: SearchableSortDirection | null;
};

export enum SearchableProductSortableFields {
  id = "id",
  name = "name",
  teamId = "teamId",
  description = "description",
  favorite = "favorite",
  minimumOrderQuantity = "minimumOrderQuantity",
  moqDescription = "moqDescription",
  score = "score",
  incoTerm = "incoTerm",
  harbour = "harbour",
  masterCbm = "masterCbm",
  quantityPer20ft = "quantityPer20ft",
  quantityPer40ft = "quantityPer40ft",
  quantityPer40ftHC = "quantityPer40ftHC",
  leadTimeValue = "leadTimeValue",
  leadTimeUnit = "leadTimeUnit",
  sample = "sample",
  archived = "archived",
  reference = "reference",
  referenceKey = "referenceKey",
  creationDate = "creationDate",
  deletionDate = "deletionDate",
  lastUpdatedDate = "lastUpdatedDate",
  deleted = "deleted"
}

export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc"
}

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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  companyId: string;
  company: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedOn: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  role: TeamRole;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  role: TeamRole;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  role: TeamRole;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedOn: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedOn: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedOn: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  images: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  images: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  images: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
  description: string | null;
  website: string | null;
  phoneNumber: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  officeEmail: string | null;
  officePhone: string | null;
  incoTerm: string | null;
  harbour: string | null;
  generalMOQ: number | null;
  generalLeadTime: number | null;
  favorite: boolean;
  globalDatabaseId: string | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
  description: string | null;
  website: string | null;
  phoneNumber: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  officeEmail: string | null;
  officePhone: string | null;
  incoTerm: string | null;
  harbour: string | null;
  generalMOQ: number | null;
  generalLeadTime: number | null;
  favorite: boolean;
  globalDatabaseId: string | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
  description: string | null;
  website: string | null;
  phoneNumber: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  officeEmail: string | null;
  officePhone: string | null;
  incoTerm: string | null;
  harbour: string | null;
  generalMOQ: number | null;
  generalLeadTime: number | null;
  favorite: boolean;
  globalDatabaseId: string | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteDescriptorMutation = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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

export type SyncAProductQuery = {
  __typename: "Product";
  id: string;
  name: string;
  teamId: string;
  team: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  images: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type SyncTeamsQuery = {
  __typename: "ModelTeamConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncTeamUsersQuery = {
  __typename: "ModelTeamUserConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    role: TeamRole;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncCompaniesQuery = {
  __typename: "ModelCompanyConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedOn: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListCompanysQuery = {
  __typename: "ModelCompanyConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  preferredLanguage: Lang | null;
  avatar: string | null;
  creationDate: number | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    preferredLanguage: Lang | null;
    avatar: string | null;
    creationDate: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncProductsQuery = {
  __typename: "ModelProductConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  images: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListProductsQuery = {
  __typename: "ModelProductConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncSuppliersQuery = {
  __typename: "ModelSupplierConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  name: string;
  fullName: string | null;
  tradingName: string | null;
  description: string | null;
  website: string | null;
  phoneNumber: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  officeEmail: string | null;
  officePhone: string | null;
  incoTerm: string | null;
  harbour: string | null;
  generalMOQ: number | null;
  generalLeadTime: number | null;
  favorite: boolean;
  globalDatabaseId: string | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListSuppliersQuery = {
  __typename: "ModelSupplierConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncDescriptorsQuery = {
  __typename: "ModelDescriptorConnection";
  items: Array<{
    __typename: "Descriptor";
    id: string;
    teamId: string;
    sections: Array<{
      __typename: "SectionDescriptor";
      name: string;
    } | null> | null;
    target: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetDescriptorQuery = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListDescriptorsQuery = {
  __typename: "ModelDescriptorConnection";
  items: Array<{
    __typename: "Descriptor";
    id: string;
    teamId: string;
    sections: Array<{
      __typename: "SectionDescriptor";
      name: string;
    } | null> | null;
    target: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncCategoriesQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListCategorysQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncContactsQuery = {
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
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncImagesQuery = {
  __typename: "ModelImageConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncTasksQuery = {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type ListTeamByUserQuery = {
  __typename: "ModelTeamUserConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    role: TeamRole;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type ListCompanyByOwnerQuery = {
  __typename: "ModelCompanyConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedOn: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SearchProductsQuery = {
  __typename: "SearchableProductConnection";
  items: Array<{
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  total: number | null;
};

export type OnCreateDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteDescriptorSubscription = {
  __typename: "Descriptor";
  id: string;
  teamId: string;
  sections: Array<{
    __typename: "SectionDescriptor";
    name: string;
    fields: Array<{
      __typename: "FieldDescriptor";
      name: string;
      label: string;
      type: string;
      defaultValue: string | null;
      fixedValue: boolean | null;
      metadata: string | null;
    } | null> | null;
  } | null> | null;
  target: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  product: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    supplier: {
      __typename: "Supplier";
      id: string;
      teamId: string;
      name: string;
      fullName: string | null;
      tradingName: string | null;
      description: string | null;
      website: string | null;
      phoneNumber: string | null;
      country: string | null;
      city: string | null;
      address: string | null;
      officeEmail: string | null;
      officePhone: string | null;
      incoTerm: string | null;
      harbour: string | null;
      generalMOQ: number | null;
      generalLeadTime: number | null;
      favorite: boolean;
      globalDatabaseId: string | null;
      reference: string | null;
      referenceKey: number | null;
      creationDate: number;
      deletionDate: number | null;
      lastUpdatedDate: number;
      deleted: boolean;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  supplier: {
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    name: string;
    fullName: string | null;
    tradingName: string | null;
    description: string | null;
    website: string | null;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    officeEmail: string | null;
    officePhone: string | null;
    incoTerm: string | null;
    harbour: string | null;
    generalMOQ: number | null;
    generalLeadTime: number | null;
    favorite: boolean;
    globalDatabaseId: string | null;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
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
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    lastUpdatedDate: number;
    deleted: boolean;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
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
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  lastUpdatedDate: number;
  deleted: boolean;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
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
            _version
            _deleted
            _lastChangedAt
          }
          companyId
          company {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedOn
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          role
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          role
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          role
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedOn
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedOn
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedOn
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          images {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          images {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          images {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          name
          fullName
          tradingName
          description
          website
          phoneNumber
          country
          city
          address
          officeEmail
          officePhone
          incoTerm
          harbour
          generalMOQ
          generalLeadTime
          favorite
          globalDatabaseId
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          name
          fullName
          tradingName
          description
          website
          phoneNumber
          country
          city
          address
          officeEmail
          officePhone
          incoTerm
          harbour
          generalMOQ
          generalLeadTime
          favorite
          globalDatabaseId
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          name
          fullName
          tradingName
          description
          website
          phoneNumber
          country
          city
          address
          officeEmail
          officePhone
          incoTerm
          harbour
          generalMOQ
          generalLeadTime
          favorite
          globalDatabaseId
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
  async SyncAProduct(teamId?: string): Promise<SyncAProductQuery> {
    const statement = `query SyncAProduct($teamId: String) {
        syncAProduct(teamId: $teamId) {
          __typename
          id
          name
          teamId
          team {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          images {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (teamId) {
      gqlAPIServiceArguments.teamId = teamId;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncAProductQuery>response.data.syncAProduct;
  }
  async SyncTeams(
    filter?: ModelTeamFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncTeamsQuery> {
    const statement = `query SyncTeams($filter: ModelTeamFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncTeams(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncTeamsQuery>response.data.syncTeams;
  }
  async SyncTeamUsers(
    filter?: ModelTeamUserFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncTeamUsersQuery> {
    const statement = `query SyncTeamUsers($filter: ModelTeamUserFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncTeamUsers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            role
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncTeamUsersQuery>response.data.syncTeamUsers;
  }
  async SyncCompanies(
    filter?: ModelCompanyFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncCompaniesQuery> {
    const statement = `query SyncCompanies($filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncCompanies(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncCompaniesQuery>response.data.syncCompanies;
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedOn
          _version
          _deleted
          _lastChangedAt
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
    id?: string,
    filter?: ModelCompanyFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListCompanysQuery> {
    const statement = `query ListCompanys($id: ID, $filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listCompanys(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
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
    return <ListCompanysQuery>response.data.listCompanys;
  }
  async SyncUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUsersQuery> {
    const statement = `query SyncUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUsers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUsersQuery>response.data.syncUsers;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          email
          firstName
          lastName
          phoneNumber
          preferredLanguage
          avatar
          creationDate
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            firstName
            lastName
            phoneNumber
            preferredLanguage
            avatar
            creationDate
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListUsersQuery>response.data.listUsers;
  }
  async SyncProducts(
    filter?: ModelProductFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncProductsQuery> {
    const statement = `query SyncProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncProducts(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncProductsQuery>response.data.syncProducts;
  }
  async GetProduct(id: string): Promise<GetProductQuery> {
    const statement = `query GetProduct($id: ID!) {
        getProduct(id: $id) {
          __typename
          id
          name
          teamId
          team {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          images {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProductQuery>response.data.getProduct;
  }
  async ListProducts(
    filter?: ModelProductFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListProductsQuery> {
    const statement = `query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {
        listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListProductsQuery>response.data.listProducts;
  }
  async SyncSuppliers(
    filter?: ModelSupplierFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncSuppliersQuery> {
    const statement = `query SyncSuppliers($filter: ModelSupplierFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncSuppliers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncSuppliersQuery>response.data.syncSuppliers;
  }
  async GetSupplier(id: string): Promise<GetSupplierQuery> {
    const statement = `query GetSupplier($id: ID!) {
        getSupplier(id: $id) {
          __typename
          id
          teamId
          team {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          name
          fullName
          tradingName
          description
          website
          phoneNumber
          country
          city
          address
          officeEmail
          officePhone
          incoTerm
          harbour
          generalMOQ
          generalLeadTime
          favorite
          globalDatabaseId
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSupplierQuery>response.data.getSupplier;
  }
  async ListSuppliers(
    filter?: ModelSupplierFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSuppliersQuery> {
    const statement = `query ListSuppliers($filter: ModelSupplierFilterInput, $limit: Int, $nextToken: String) {
        listSuppliers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListSuppliersQuery>response.data.listSuppliers;
  }
  async SyncDescriptors(
    filter?: ModelDescriptorFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncDescriptorsQuery> {
    const statement = `query SyncDescriptors($filter: ModelDescriptorFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncDescriptors(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            teamId
            sections {
              __typename
              name
            }
            target
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncDescriptorsQuery>response.data.syncDescriptors;
  }
  async GetDescriptor(id: string): Promise<GetDescriptorQuery> {
    const statement = `query GetDescriptor($id: ID!) {
        getDescriptor(id: $id) {
          __typename
          id
          teamId
          sections {
            __typename
            name
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetDescriptorQuery>response.data.getDescriptor;
  }
  async ListDescriptors(
    filter?: ModelDescriptorFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListDescriptorsQuery> {
    const statement = `query ListDescriptors($filter: ModelDescriptorFilterInput, $limit: Int, $nextToken: String) {
        listDescriptors(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            teamId
            sections {
              __typename
              name
            }
            target
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListDescriptorsQuery>response.data.listDescriptors;
  }
  async SyncCategories(
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncCategoriesQuery> {
    const statement = `query SyncCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncCategories(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncCategoriesQuery>response.data.syncCategories;
  }
  async GetCategory(id: string): Promise<GetCategoryQuery> {
    const statement = `query GetCategory($id: ID!) {
        getCategory(id: $id) {
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCategoryQuery>response.data.getCategory;
  }
  async ListCategorys(
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCategorysQuery> {
    const statement = `query ListCategorys($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
        listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListCategorysQuery>response.data.listCategorys;
  }
  async SyncContacts(
    filter?: ModelContactFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncContactsQuery> {
    const statement = `query SyncContacts($filter: ModelContactFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncContacts(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
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
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncContactsQuery>response.data.syncContacts;
  }
  async GetContact(id: string): Promise<GetContactQuery> {
    const statement = `query GetContact($id: ID!) {
        getContact(id: $id) {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetContactQuery>response.data.getContact;
  }
  async ListContacts(
    filter?: ModelContactFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListContactsQuery> {
    const statement = `query ListContacts($filter: ModelContactFilterInput, $limit: Int, $nextToken: String) {
        listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListContactsQuery>response.data.listContacts;
  }
  async SyncImages(
    filter?: ModelImageFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncImagesQuery> {
    const statement = `query SyncImages($filter: ModelImageFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncImages(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncImagesQuery>response.data.syncImages;
  }
  async GetImage(id: string): Promise<GetImageQuery> {
    const statement = `query GetImage($id: ID!) {
        getImage(id: $id) {
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImageQuery>response.data.getImage;
  }
  async ListImages(
    filter?: ModelImageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListImagesQuery> {
    const statement = `query ListImages($filter: ModelImageFilterInput, $limit: Int, $nextToken: String) {
        listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListImagesQuery>response.data.listImages;
  }
  async SyncTasks(
    filter?: ModelTaskFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncTasksQuery> {
    const statement = `query SyncTasks($filter: ModelTaskFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncTasks(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncTasksQuery>response.data.syncTasks;
  }
  async GetTask(id: string): Promise<GetTaskQuery> {
    const statement = `query GetTask($id: ID!) {
        getTask(id: $id) {
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTaskQuery>response.data.getTask;
  }
  async ListTasks(
    filter?: ModelTaskFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTasksQuery> {
    const statement = `query ListTasks($filter: ModelTaskFilterInput, $limit: Int, $nextToken: String) {
        listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListTasksQuery>response.data.listTasks;
  }
  async ListTeamByUser(
    userId?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelTeamUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTeamByUserQuery> {
    const statement = `query ListTeamByUser($userId: ID, $sortDirection: ModelSortDirection, $filter: ModelTeamUserFilterInput, $limit: Int, $nextToken: String) {
        listTeamByUser(userId: $userId, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            role
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
    return <ListTeamByUserQuery>response.data.listTeamByUser;
  }
  async ListCompanyByOwner(
    ownerUserId?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelCompanyFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCompanyByOwnerQuery> {
    const statement = `query ListCompanyByOwner($ownerUserId: ID, $sortDirection: ModelSortDirection, $filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String) {
        listCompanyByOwner(ownerUserId: $ownerUserId, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedOn
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (ownerUserId) {
      gqlAPIServiceArguments.ownerUserId = ownerUserId;
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
    return <ListCompanyByOwnerQuery>response.data.listCompanyByOwner;
  }
  async SearchProducts(
    filter?: SearchableProductFilterInput,
    sort?: SearchableProductSortInput,
    limit?: number,
    nextToken?: string
  ): Promise<SearchProductsQuery> {
    const statement = `query SearchProducts($filter: SearchableProductFilterInput, $sort: SearchableProductSortInput, $limit: Int, $nextToken: String) {
        searchProducts(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          total
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (sort) {
      gqlAPIServiceArguments.sort = sort;
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
    return <SearchProductsQuery>response.data.searchProducts;
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            fields {
              __typename
              name
              label
              type
              defaultValue
              fixedValue
              metadata
            }
          }
          target
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          product {
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
              _version
              _deleted
              _lastChangedAt
            }
            supplier {
              __typename
              id
              teamId
              name
              fullName
              tradingName
              description
              website
              phoneNumber
              country
              city
              address
              officeEmail
              officePhone
              incoTerm
              harbour
              generalMOQ
              generalLeadTime
              favorite
              globalDatabaseId
              reference
              referenceKey
              creationDate
              deletionDate
              lastUpdatedDate
              deleted
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
          }
          supplier {
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
              _version
              _deleted
              _lastChangedAt
            }
            name
            fullName
            tradingName
            description
            website
            phoneNumber
            country
            city
            address
            officeEmail
            officePhone
            incoTerm
            harbour
            generalMOQ
            generalLeadTime
            favorite
            globalDatabaseId
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            lastUpdatedDate
            deleted
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          lastUpdatedDate
          deleted
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteTaskSubscription>;
}
