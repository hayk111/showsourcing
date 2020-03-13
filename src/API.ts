/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateTeamInput = {
  name: string,
  companyId: string,
};

export enum Lang {
  EN = "EN",
  FR = "FR",
  CN = "CN",
}


export type CreateProductInput = {
  id: string,
  name: string,
  teamId: string,
  price?: PriceInput | null,
  description?: string | null,
  favorite?: boolean | null,
  minimumOrderQuantity?: number | null,
  moqDescription?: string | null,
  score?: number | null,
  incoTerm?: string | null,
  harbour?: string | null,
  masterCbm?: number | null,
  quantityPer20ft?: number | null,
  quantityPer40ft?: number | null,
  quantityPer40ftHC?: number | null,
  leadTimeValue?: number | null,
  leadTimeUnit?: string | null,
  sample?: boolean | null,
  samplePrice?: PriceInput | null,
  archived: boolean,
  reference?: string | null,
  referenceKey?: number | null,
  creationDate: number,
  deletionDate?: number | null,
  lastUpdatedDate: number,
  deleted: boolean,
  productSupplierId?: string | null,
  productAssigneeId?: string | null,
  productCreatedById: string,
  productDeletedById?: string | null,
};

export type PriceInput = {
  currency?: string | null,
  value?: number | null,
  baseCurrencyValue?: number | null,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  minimumOrderQuantity?: ModelIntInput | null,
  moqDescription?: ModelStringInput | null,
  score?: ModelIntInput | null,
  incoTerm?: ModelStringInput | null,
  harbour?: ModelStringInput | null,
  masterCbm?: ModelFloatInput | null,
  quantityPer20ft?: ModelIntInput | null,
  quantityPer40ft?: ModelIntInput | null,
  quantityPer40ftHC?: ModelIntInput | null,
  leadTimeValue?: ModelIntInput | null,
  leadTimeUnit?: ModelStringInput | null,
  sample?: ModelBooleanInput | null,
  archived?: ModelBooleanInput | null,
  reference?: ModelStringInput | null,
  referenceKey?: ModelIntInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
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
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  teamId: string,
  price?: PriceInput | null,
  description?: string | null,
  favorite?: boolean | null,
  minimumOrderQuantity?: number | null,
  moqDescription?: string | null,
  score?: number | null,
  incoTerm?: string | null,
  harbour?: string | null,
  masterCbm?: number | null,
  quantityPer20ft?: number | null,
  quantityPer40ft?: number | null,
  quantityPer40ftHC?: number | null,
  leadTimeValue?: number | null,
  leadTimeUnit?: string | null,
  sample?: boolean | null,
  samplePrice?: PriceInput | null,
  archived?: boolean | null,
  reference?: string | null,
  referenceKey?: number | null,
  creationDate?: number | null,
  deletionDate?: number | null,
  lastUpdatedDate?: number | null,
  deleted?: boolean | null,
  productSupplierId?: string | null,
  productAssigneeId?: string | null,
  productCreatedById?: string | null,
  productDeletedById?: string | null,
};

export type DeleteProductInput = {
  teamId: string,
  id: string,
};

export type CreateSupplierInput = {
  id: string,
  teamId: string,
  name: string,
  fullName?: string | null,
  tradingName?: string | null,
};

export type ModelSupplierConditionInput = {
  name?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  tradingName?: ModelStringInput | null,
  and?: Array< ModelSupplierConditionInput | null > | null,
  or?: Array< ModelSupplierConditionInput | null > | null,
  not?: ModelSupplierConditionInput | null,
};

export type UpdateSupplierInput = {
  id: string,
  teamId: string,
  name?: string | null,
  fullName?: string | null,
  tradingName?: string | null,
};

export type DeleteSupplierInput = {
  teamId: string,
  id: string,
};

export type CreateDescriptorInput = {
  id: string,
  teamId: string,
  sections?: Array< SectionDescriptorInput | null > | null,
  target?: string | null,
};

export type SectionDescriptorInput = {
  name: string,
  fields?: Array< FieldDescriptorInput | null > | null,
};

export type FieldDescriptorInput = {
  name: string,
  label: string,
  type: string,
  defaultValue?: string | null,
  fixedValue?: boolean | null,
  metadata?: string | null,
};

export type ModelDescriptorConditionInput = {
  target?: ModelStringInput | null,
  and?: Array< ModelDescriptorConditionInput | null > | null,
  or?: Array< ModelDescriptorConditionInput | null > | null,
  not?: ModelDescriptorConditionInput | null,
};

export type UpdateDescriptorInput = {
  id: string,
  teamId: string,
  sections?: Array< SectionDescriptorInput | null > | null,
  target?: string | null,
};

export type DeleteDescriptorInput = {
  teamId: string,
  id: string,
};

export type CreateCategoryInput = {
  id: string,
  teamId: string,
  name: string,
  creationDate: number,
  deletionDate?: number | null,
  lastupdatedByUserId: string,
  lastUpdatedDate: number,
  deleted: boolean,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastupdatedByUserId?: ModelIDInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  teamId: string,
  name?: string | null,
  creationDate?: number | null,
  deletionDate?: number | null,
  lastupdatedByUserId?: string | null,
  lastUpdatedDate?: number | null,
  deleted?: boolean | null,
};

export type DeleteCategoryInput = {
  teamId: string,
  id: string,
};

export type CreateContactInput = {
  id: string,
  teamId: string,
  companyId?: string | null,
  name?: string | null,
  phoneNumber?: string | null,
  email?: string | null,
  jobTitle?: string | null,
  creationDate: number,
  deletionDate?: number | null,
  lastUpdatedDate: number,
  deleted: boolean,
  contactSupplierId?: string | null,
};

export type ModelContactConditionInput = {
  companyId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
};

export type UpdateContactInput = {
  id: string,
  teamId: string,
  companyId?: string | null,
  name?: string | null,
  phoneNumber?: string | null,
  email?: string | null,
  jobTitle?: string | null,
  creationDate?: number | null,
  deletionDate?: number | null,
  lastUpdatedDate?: number | null,
  deleted?: boolean | null,
  contactSupplierId?: string | null,
};

export type DeleteContactInput = {
  teamId: string,
  id: string,
};

export type CreateImageInput = {
  id: string,
  teamId: string,
  fileName: string,
  orientation: number,
  imageType: string,
  urls?: Array< ImageUrlInput | null > | null,
  creationDate: number,
  deletionDate?: number | null,
  lastUpdatedDate: number,
  deleted: boolean,
};

export type ImageUrlInput = {
  id: string,
  maxWidth: number,
  maxHeight: number,
  url: string,
};

export type ModelImageConditionInput = {
  fileName?: ModelStringInput | null,
  orientation?: ModelIntInput | null,
  imageType?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelImageConditionInput | null > | null,
  or?: Array< ModelImageConditionInput | null > | null,
  not?: ModelImageConditionInput | null,
};

export type UpdateImageInput = {
  id: string,
  teamId: string,
  fileName?: string | null,
  orientation?: number | null,
  imageType?: string | null,
  urls?: Array< ImageUrlInput | null > | null,
  creationDate?: number | null,
  deletionDate?: number | null,
  lastUpdatedDate?: number | null,
  deleted?: boolean | null,
};

export type DeleteImageInput = {
  teamId: string,
  id: string,
};

export type CreateTaskInput = {
  id: string,
  teamId: string,
  name?: string | null,
  description?: string | null,
  dueDate?: number | null,
  completed?: boolean | null,
  completionDate?: number | null,
  assigneeUserId: string,
  reference?: string | null,
  referenceKey?: number | null,
  inProgress?: boolean | null,
  creationDate: number,
  deletionDate?: number | null,
  lastUpdatedDate: number,
  deleted: boolean,
  taskProductId?: string | null,
  taskSupplierId?: string | null,
};

export type ModelTaskConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDate?: ModelIntInput | null,
  completed?: ModelBooleanInput | null,
  completionDate?: ModelIntInput | null,
  assigneeUserId?: ModelIDInput | null,
  reference?: ModelStringInput | null,
  referenceKey?: ModelIntInput | null,
  inProgress?: ModelBooleanInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type UpdateTaskInput = {
  id: string,
  teamId: string,
  name?: string | null,
  description?: string | null,
  dueDate?: number | null,
  completed?: boolean | null,
  completionDate?: number | null,
  assigneeUserId?: string | null,
  reference?: string | null,
  referenceKey?: number | null,
  inProgress?: boolean | null,
  creationDate?: number | null,
  deletionDate?: number | null,
  lastUpdatedDate?: number | null,
  deleted?: boolean | null,
  taskProductId?: string | null,
  taskSupplierId?: string | null,
};

export type DeleteTaskInput = {
  teamId: string,
  id: string,
};

export type CreateTeamUserInput = {
  teamId: string,
  userId: string,
  role: TeamRole,
};

export enum TeamRole {
  TEAMOWNER = "TEAMOWNER",
  TEAMMEMBER = "TEAMMEMBER",
  TEAMVIEWER = "TEAMVIEWER",
}


export type ModelTeamUserConditionInput = {
  role?: ModelTeamRoleInput | null,
  and?: Array< ModelTeamUserConditionInput | null > | null,
  or?: Array< ModelTeamUserConditionInput | null > | null,
  not?: ModelTeamUserConditionInput | null,
};

export type ModelTeamRoleInput = {
  eq?: TeamRole | null,
  ne?: TeamRole | null,
};

export type UpdateTeamUserInput = {
  teamId: string,
  userId: string,
  role?: TeamRole | null,
};

export type DeleteTeamUserInput = {
  teamId: string,
  userId: string,
};

export type CreateCompanyInput = {
  name: string,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  ownerUserId?: ModelIDInput | null,
  createdByUserId?: ModelIDInput | null,
  createdOn?: ModelIntInput | null,
  lastUpdatedByUserId?: ModelIDInput | null,
  lastUpdatedOn?: ModelIntInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  ownerUserId?: string | null,
  createdByUserId?: string | null,
  createdOn?: number | null,
  lastUpdatedByUserId?: string | null,
  lastUpdatedOn?: number | null,
};

export type DeleteCompanyInput = {
  id?: string | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  phoneNumber?: string | null,
  preferredLanguage?: Lang | null,
  avatar?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  preferredLanguage?: ModelLangInput | null,
  avatar?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelLangInput = {
  eq?: Lang | null,
  ne?: Lang | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  teamId?: ModelIDInput | null,
  description?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  minimumOrderQuantity?: ModelIntInput | null,
  moqDescription?: ModelStringInput | null,
  score?: ModelIntInput | null,
  incoTerm?: ModelStringInput | null,
  harbour?: ModelStringInput | null,
  masterCbm?: ModelFloatInput | null,
  quantityPer20ft?: ModelIntInput | null,
  quantityPer40ft?: ModelIntInput | null,
  quantityPer40ftHC?: ModelIntInput | null,
  leadTimeValue?: ModelIntInput | null,
  leadTimeUnit?: ModelStringInput | null,
  sample?: ModelBooleanInput | null,
  archived?: ModelBooleanInput | null,
  reference?: ModelStringInput | null,
  referenceKey?: ModelIntInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSupplierFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  tradingName?: ModelStringInput | null,
  and?: Array< ModelSupplierFilterInput | null > | null,
  or?: Array< ModelSupplierFilterInput | null > | null,
  not?: ModelSupplierFilterInput | null,
};

export type ModelDescriptorFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  target?: ModelStringInput | null,
  and?: Array< ModelDescriptorFilterInput | null > | null,
  or?: Array< ModelDescriptorFilterInput | null > | null,
  not?: ModelDescriptorFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastupdatedByUserId?: ModelIDInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelContactFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelContactFilterInput | null > | null,
  or?: Array< ModelContactFilterInput | null > | null,
  not?: ModelContactFilterInput | null,
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  fileName?: ModelStringInput | null,
  orientation?: ModelIntInput | null,
  imageType?: ModelStringInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelImageFilterInput | null > | null,
  or?: Array< ModelImageFilterInput | null > | null,
  not?: ModelImageFilterInput | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDate?: ModelIntInput | null,
  completed?: ModelBooleanInput | null,
  completionDate?: ModelIntInput | null,
  assigneeUserId?: ModelIDInput | null,
  reference?: ModelStringInput | null,
  referenceKey?: ModelIntInput | null,
  inProgress?: ModelBooleanInput | null,
  creationDate?: ModelIntInput | null,
  deletionDate?: ModelIntInput | null,
  lastUpdatedDate?: ModelIntInput | null,
  deleted?: ModelBooleanInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelTeamFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  ownerUserId?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  createdByUserId?: ModelIDInput | null,
  createdOn?: ModelIntInput | null,
  lastUpdatedByUserId?: ModelIDInput | null,
  lastUpdatedOn?: ModelIntInput | null,
  and?: Array< ModelTeamFilterInput | null > | null,
  or?: Array< ModelTeamFilterInput | null > | null,
  not?: ModelTeamFilterInput | null,
};

export type ModelTeamUserFilterInput = {
  teamId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  role?: ModelTeamRoleInput | null,
  and?: Array< ModelTeamUserFilterInput | null > | null,
  or?: Array< ModelTeamUserFilterInput | null > | null,
  not?: ModelTeamUserFilterInput | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  ownerUserId?: ModelIDInput | null,
  createdByUserId?: ModelIDInput | null,
  createdOn?: ModelIntInput | null,
  lastUpdatedByUserId?: ModelIDInput | null,
  lastUpdatedOn?: ModelIntInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type CreateTeamMutationVariables = {
  input?: CreateTeamInput | null,
};

export type CreateTeamMutation = {
  createTeam:  {
    __typename: "Team",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    companyId: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      ownerUserId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct:  {
    __typename: "Product",
    id: string,
    name: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    images:  Array< {
      __typename: "Image",
      id: string,
      teamId: string,
      fileName: string,
      orientation: number,
      imageType: string,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    price:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    category:  {
      __typename: "Category",
      id: string,
      teamId: string,
      name: string,
      creationDate: number,
      deletionDate: number | null,
      lastupdatedByUserId: string,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    description: string | null,
    favorite: boolean | null,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    minimumOrderQuantity: number | null,
    moqDescription: string | null,
    score: number | null,
    incoTerm: string | null,
    harbour: string | null,
    masterCbm: number | null,
    quantityPer20ft: number | null,
    quantityPer40ft: number | null,
    quantityPer40ftHC: number | null,
    leadTimeValue: number | null,
    leadTimeUnit: string | null,
    sample: boolean | null,
    samplePrice:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    archived: boolean,
    reference: string | null,
    referenceKey: number | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct:  {
    __typename: "Product",
    id: string,
    name: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    images:  Array< {
      __typename: "Image",
      id: string,
      teamId: string,
      fileName: string,
      orientation: number,
      imageType: string,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    price:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    category:  {
      __typename: "Category",
      id: string,
      teamId: string,
      name: string,
      creationDate: number,
      deletionDate: number | null,
      lastupdatedByUserId: string,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    description: string | null,
    favorite: boolean | null,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    minimumOrderQuantity: number | null,
    moqDescription: string | null,
    score: number | null,
    incoTerm: string | null,
    harbour: string | null,
    masterCbm: number | null,
    quantityPer20ft: number | null,
    quantityPer40ft: number | null,
    quantityPer40ftHC: number | null,
    leadTimeValue: number | null,
    leadTimeUnit: string | null,
    sample: boolean | null,
    samplePrice:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    archived: boolean,
    reference: string | null,
    referenceKey: number | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct:  {
    __typename: "Product",
    id: string,
    name: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    images:  Array< {
      __typename: "Image",
      id: string,
      teamId: string,
      fileName: string,
      orientation: number,
      imageType: string,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    price:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    category:  {
      __typename: "Category",
      id: string,
      teamId: string,
      name: string,
      creationDate: number,
      deletionDate: number | null,
      lastupdatedByUserId: string,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    description: string | null,
    favorite: boolean | null,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    minimumOrderQuantity: number | null,
    moqDescription: string | null,
    score: number | null,
    incoTerm: string | null,
    harbour: string | null,
    masterCbm: number | null,
    quantityPer20ft: number | null,
    quantityPer40ft: number | null,
    quantityPer40ftHC: number | null,
    leadTimeValue: number | null,
    leadTimeUnit: string | null,
    sample: boolean | null,
    samplePrice:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    archived: boolean,
    reference: string | null,
    referenceKey: number | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type CreateSupplierMutationVariables = {
  input: CreateSupplierInput,
  condition?: ModelSupplierConditionInput | null,
};

export type CreateSupplierMutation = {
  createSupplier:  {
    __typename: "Supplier",
    id: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    name: string,
    fullName: string | null,
    tradingName: string | null,
  } | null,
};

export type UpdateSupplierMutationVariables = {
  input: UpdateSupplierInput,
  condition?: ModelSupplierConditionInput | null,
};

export type UpdateSupplierMutation = {
  updateSupplier:  {
    __typename: "Supplier",
    id: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    name: string,
    fullName: string | null,
    tradingName: string | null,
  } | null,
};

export type DeleteSupplierMutationVariables = {
  input: DeleteSupplierInput,
  condition?: ModelSupplierConditionInput | null,
};

export type DeleteSupplierMutation = {
  deleteSupplier:  {
    __typename: "Supplier",
    id: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    name: string,
    fullName: string | null,
    tradingName: string | null,
  } | null,
};

export type CreateDescriptorMutationVariables = {
  input: CreateDescriptorInput,
  condition?: ModelDescriptorConditionInput | null,
};

export type CreateDescriptorMutation = {
  createDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type UpdateDescriptorMutationVariables = {
  input: UpdateDescriptorInput,
  condition?: ModelDescriptorConditionInput | null,
};

export type UpdateDescriptorMutation = {
  updateDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type DeleteDescriptorMutationVariables = {
  input: DeleteDescriptorInput,
  condition?: ModelDescriptorConditionInput | null,
};

export type DeleteDescriptorMutation = {
  deleteDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type CreateContactMutationVariables = {
  input: CreateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type CreateContactMutation = {
  createContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type UpdateContactMutationVariables = {
  input: UpdateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type UpdateContactMutation = {
  updateContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type DeleteContactMutationVariables = {
  input: DeleteContactInput,
  condition?: ModelContactConditionInput | null,
};

export type DeleteContactMutation = {
  deleteContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type CreateImageMutationVariables = {
  input: CreateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type CreateImageMutation = {
  createImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type UpdateImageMutationVariables = {
  input: UpdateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type UpdateImageMutation = {
  updateImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type DeleteImageMutationVariables = {
  input: DeleteImageInput,
  condition?: ModelImageConditionInput | null,
};

export type DeleteImageMutation = {
  deleteImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type CreateTeamUserMutationVariables = {
  input: CreateTeamUserInput,
  condition?: ModelTeamUserConditionInput | null,
};

export type CreateTeamUserMutation = {
  createTeamUser:  {
    __typename: "TeamUser",
    teamId: string,
    userId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    role: TeamRole,
  } | null,
};

export type UpdateTeamUserMutationVariables = {
  input: UpdateTeamUserInput,
  condition?: ModelTeamUserConditionInput | null,
};

export type UpdateTeamUserMutation = {
  updateTeamUser:  {
    __typename: "TeamUser",
    teamId: string,
    userId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    role: TeamRole,
  } | null,
};

export type DeleteTeamUserMutationVariables = {
  input: DeleteTeamUserInput,
  condition?: ModelTeamUserConditionInput | null,
};

export type DeleteTeamUserMutation = {
  deleteTeamUser:  {
    __typename: "TeamUser",
    teamId: string,
    userId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    role: TeamRole,
  } | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    preferredLanguage: Lang | null,
    avatar: string | null,
    creationDate: number | null,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo: string | null,
};

export type GetStreamTokenQueryVariables = {
  teamId?: string | null,
};

export type GetStreamTokenQuery = {
  getStreamToken:  {
    __typename: "GetStreamToken",
    token: string,
    feedName: string,
    feedId: string,
  } | null,
};

export type GetStreamNotificationTokenQueryVariables = {
  teamId?: string | null,
};

export type GetStreamNotificationTokenQuery = {
  getStreamNotificationToken:  {
    __typename: "GetStreamToken",
    token: string,
    feedName: string,
    feedId: string,
  } | null,
};

export type GetProductQueryVariables = {
  teamId: string,
  id: string,
};

export type GetProductQuery = {
  getProduct:  {
    __typename: "Product",
    id: string,
    name: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    images:  Array< {
      __typename: "Image",
      id: string,
      teamId: string,
      fileName: string,
      orientation: number,
      imageType: string,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    price:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    category:  {
      __typename: "Category",
      id: string,
      teamId: string,
      name: string,
      creationDate: number,
      deletionDate: number | null,
      lastupdatedByUserId: string,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    description: string | null,
    favorite: boolean | null,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    minimumOrderQuantity: number | null,
    moqDescription: string | null,
    score: number | null,
    incoTerm: string | null,
    harbour: string | null,
    masterCbm: number | null,
    quantityPer20ft: number | null,
    quantityPer40ft: number | null,
    quantityPer40ftHC: number | null,
    leadTimeValue: number | null,
    leadTimeUnit: string | null,
    sample: boolean | null,
    samplePrice:  {
      __typename: "Price",
      currency: string | null,
      value: number | null,
      baseCurrencyValue: number | null,
    } | null,
    archived: boolean,
    reference: string | null,
    referenceKey: number | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type ListProductsQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSupplierQueryVariables = {
  teamId: string,
  id: string,
};

export type GetSupplierQuery = {
  getSupplier:  {
    __typename: "Supplier",
    id: string,
    teamId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    name: string,
    fullName: string | null,
    tradingName: string | null,
  } | null,
};

export type ListSuppliersQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelSupplierFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSuppliersQuery = {
  listSuppliers:  {
    __typename: "ModelSupplierConnection",
    items:  Array< {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDescriptorQueryVariables = {
  teamId: string,
  id: string,
};

export type GetDescriptorQuery = {
  getDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type ListDescriptorsQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelDescriptorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDescriptorsQuery = {
  listDescriptors:  {
    __typename: "ModelDescriptorConnection",
    items:  Array< {
      __typename: "Descriptor",
      id: string,
      teamId: string,
      target: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  teamId: string,
  id: string,
};

export type GetCategoryQuery = {
  getCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type ListCategorysQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCategorysQuery = {
  listCategorys:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      teamId: string,
      name: string,
      creationDate: number,
      deletionDate: number | null,
      lastupdatedByUserId: string,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetContactQueryVariables = {
  teamId: string,
  id: string,
};

export type GetContactQuery = {
  getContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type ListContactsQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListContactsQuery = {
  listContacts:  {
    __typename: "ModelContactConnection",
    items:  Array< {
      __typename: "Contact",
      id: string,
      teamId: string,
      companyId: string | null,
      name: string | null,
      phoneNumber: string | null,
      email: string | null,
      jobTitle: string | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetImageQueryVariables = {
  teamId: string,
  id: string,
};

export type GetImageQuery = {
  getImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type ListImagesQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListImagesQuery = {
  listImages:  {
    __typename: "ModelImageConnection",
    items:  Array< {
      __typename: "Image",
      id: string,
      teamId: string,
      fileName: string,
      orientation: number,
      imageType: string,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  teamId: string,
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type ListTasksQueryVariables = {
  teamId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      teamId: string,
      name: string | null,
      description: string | null,
      dueDate: number | null,
      completed: boolean | null,
      completionDate: number | null,
      assigneeUserId: string,
      reference: string | null,
      referenceKey: number | null,
      inProgress: boolean | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTeamQueryVariables = {
  id: string,
};

export type GetTeamQuery = {
  getTeam:  {
    __typename: "Team",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    companyId: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      ownerUserId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamsQuery = {
  listTeams:  {
    __typename: "ModelTeamConnection",
    items:  Array< {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTeamUserQueryVariables = {
  teamId: string,
  userId: string,
};

export type GetTeamUserQuery = {
  getTeamUser:  {
    __typename: "TeamUser",
    teamId: string,
    userId: string,
    team:  {
      __typename: "Team",
      id: string,
      name: string,
      ownerUserId: string,
      companyId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    role: TeamRole,
  } | null,
};

export type ListTeamUsersQueryVariables = {
  teamId?: string | null,
  userId?: ModelIDKeyConditionInput | null,
  filter?: ModelTeamUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTeamUsersQuery = {
  listTeamUsers:  {
    __typename: "ModelTeamUserConnection",
    items:  Array< {
      __typename: "TeamUser",
      teamId: string,
      userId: string,
      role: TeamRole,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    ownerUserId: string,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdByUserId: string,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    createdOn: number,
    lastUpdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedOn: number | null,
  } | null,
};

export type ListCompanysQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanysQuery = {
  listCompanys:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      ownerUserId: string,
      createdByUserId: string,
      createdOn: number,
      lastUpdatedByUserId: string,
      lastUpdatedOn: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type UserQueryVariables = {
  id: string,
};

export type UserQuery = {
  user:  {
    __typename: "User",
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    preferredLanguage: Lang | null,
    avatar: string | null,
    creationDate: number | null,
  } | null,
};

export type ListTeamUserByUserQueryVariables = {
  userId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTeamUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamUserByUserQuery = {
  listTeamUserByUser:  {
    __typename: "ModelTeamUserConnection",
    items:  Array< {
      __typename: "TeamUser",
      teamId: string,
      userId: string,
      role: TeamRole,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDescriptorSubscription = {
  onCreateDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type OnUpdateDescriptorSubscription = {
  onUpdateDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type OnDeleteDescriptorSubscription = {
  onDeleteDescriptor:  {
    __typename: "Descriptor",
    id: string,
    teamId: string,
    sections:  Array< {
      __typename: "SectionDescriptor",
      name: string,
    } | null > | null,
    target: string | null,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory:  {
    __typename: "Category",
    id: string,
    teamId: string,
    name: string,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastupdatedByUserId: string,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnCreateContactSubscription = {
  onCreateContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact:  {
    __typename: "Contact",
    id: string,
    teamId: string,
    companyId: string | null,
    name: string | null,
    phoneNumber: string | null,
    email: string | null,
    jobTitle: string | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnCreateImageSubscription = {
  onCreateImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnUpdateImageSubscription = {
  onUpdateImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnDeleteImageSubscription = {
  onDeleteImage:  {
    __typename: "Image",
    id: string,
    teamId: string,
    fileName: string,
    orientation: number,
    imageType: string,
    urls:  Array< {
      __typename: "ImageUrl",
      id: string,
      maxWidth: number,
      maxHeight: number,
      url: string,
    } | null > | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    id: string,
    teamId: string,
    name: string | null,
    description: string | null,
    dueDate: number | null,
    completed: boolean | null,
    completionDate: number | null,
    assigneeUserId: string,
    assignee:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      teamId: string,
      description: string | null,
      favorite: boolean | null,
      minimumOrderQuantity: number | null,
      moqDescription: string | null,
      score: number | null,
      incoTerm: string | null,
      harbour: string | null,
      masterCbm: number | null,
      quantityPer20ft: number | null,
      quantityPer40ft: number | null,
      quantityPer40ftHC: number | null,
      leadTimeValue: number | null,
      leadTimeUnit: string | null,
      sample: boolean | null,
      archived: boolean,
      reference: string | null,
      referenceKey: number | null,
      creationDate: number,
      deletionDate: number | null,
      lastUpdatedDate: number,
      deleted: boolean,
    } | null,
    supplier:  {
      __typename: "Supplier",
      id: string,
      teamId: string,
      name: string,
      fullName: string | null,
      tradingName: string | null,
    } | null,
    reference: string | null,
    referenceKey: number | null,
    inProgress: boolean | null,
    creationDate: number,
    createdBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    },
    deletedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    deletionDate: number | null,
    lastUpdatedBy:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string | null,
      preferredLanguage: Lang | null,
      avatar: string | null,
      creationDate: number | null,
    } | null,
    lastUpdatedDate: number,
    deleted: boolean,
  } | null,
};
