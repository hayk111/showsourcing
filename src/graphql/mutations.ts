// tslint:disable
// this is an auto generated file. This will be overwritten

export const createTeam = /* GraphQL */ `
  mutation CreateTeam($input: CreateTeamInput) {
    createTeam(input: $input) {
      id
      name
      ownerUserId
      owner {
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
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      teamId
      team {
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
        id
        teamId
        name
        fullName
        tradingName
      }
      images {
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
        currency
        value
        baseCurrencyValue
      }
      category {
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
        currency
        value
        baseCurrencyValue
      }
      archived
      reference
      referenceKey
      creationDate
      createdBy {
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
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      teamId
      team {
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
        id
        teamId
        name
        fullName
        tradingName
      }
      images {
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
        currency
        value
        baseCurrencyValue
      }
      category {
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
        currency
        value
        baseCurrencyValue
      }
      archived
      reference
      referenceKey
      creationDate
      createdBy {
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
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      teamId
      team {
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
        id
        teamId
        name
        fullName
        tradingName
      }
      images {
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
        currency
        value
        baseCurrencyValue
      }
      category {
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
        currency
        value
        baseCurrencyValue
      }
      archived
      reference
      referenceKey
      creationDate
      createdBy {
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
  }
`;
export const createSupplier = /* GraphQL */ `
  mutation CreateSupplier(
    $input: CreateSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    createSupplier(input: $input, condition: $condition) {
      id
      teamId
      team {
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
  }
`;
export const updateSupplier = /* GraphQL */ `
  mutation UpdateSupplier(
    $input: UpdateSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    updateSupplier(input: $input, condition: $condition) {
      id
      teamId
      team {
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
  }
`;
export const deleteSupplier = /* GraphQL */ `
  mutation DeleteSupplier(
    $input: DeleteSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    deleteSupplier(input: $input, condition: $condition) {
      id
      teamId
      team {
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
  }
`;
export const createDescriptor = /* GraphQL */ `
  mutation CreateDescriptor(
    $input: CreateDescriptorInput!
    $condition: ModelDescriptorConditionInput
  ) {
    createDescriptor(input: $input, condition: $condition) {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const updateDescriptor = /* GraphQL */ `
  mutation UpdateDescriptor(
    $input: UpdateDescriptorInput!
    $condition: ModelDescriptorConditionInput
  ) {
    updateDescriptor(input: $input, condition: $condition) {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const deleteDescriptor = /* GraphQL */ `
  mutation DeleteDescriptor(
    $input: DeleteDescriptorInput!
    $condition: ModelDescriptorConditionInput
  ) {
    deleteDescriptor(input: $input, condition: $condition) {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      teamId
      name
      creationDate
      createdBy {
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
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      teamId
      name
      creationDate
      createdBy {
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
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      teamId
      name
      creationDate
      createdBy {
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
  }
`;
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      teamId
      companyId
      name
      phoneNumber
      email
      jobTitle
      supplier {
        id
        teamId
        name
        fullName
        tradingName
      }
      creationDate
      createdBy {
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
  }
`;
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
      id
      teamId
      companyId
      name
      phoneNumber
      email
      jobTitle
      supplier {
        id
        teamId
        name
        fullName
        tradingName
      }
      creationDate
      createdBy {
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
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
      id
      teamId
      companyId
      name
      phoneNumber
      email
      jobTitle
      supplier {
        id
        teamId
        name
        fullName
        tradingName
      }
      creationDate
      createdBy {
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
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
      id
      teamId
      fileName
      orientation
      imageType
      urls {
        id
        maxWidth
        maxHeight
        url
      }
      creationDate
      createdBy {
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
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
      id
      teamId
      fileName
      orientation
      imageType
      urls {
        id
        maxWidth
        maxHeight
        url
      }
      creationDate
      createdBy {
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
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
      id
      teamId
      fileName
      orientation
      imageType
      urls {
        id
        maxWidth
        maxHeight
        url
      }
      creationDate
      createdBy {
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
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      teamId
      name
      description
      dueDate
      completed
      completionDate
      assigneeUserId
      assignee {
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
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      teamId
      name
      description
      dueDate
      completed
      completionDate
      assigneeUserId
      assignee {
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
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      teamId
      name
      description
      dueDate
      completed
      completionDate
      assigneeUserId
      assignee {
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
  }
`;
export const createTeamUser = /* GraphQL */ `
  mutation CreateTeamUser(
    $input: CreateTeamUserInput!
    $condition: ModelTeamUserConditionInput
  ) {
    createTeamUser(input: $input, condition: $condition) {
      teamId
      userId
      team {
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
  }
`;
export const updateTeamUser = /* GraphQL */ `
  mutation UpdateTeamUser(
    $input: UpdateTeamUserInput!
    $condition: ModelTeamUserConditionInput
  ) {
    updateTeamUser(input: $input, condition: $condition) {
      teamId
      userId
      team {
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
  }
`;
export const deleteTeamUser = /* GraphQL */ `
  mutation DeleteTeamUser(
    $input: DeleteTeamUserInput!
    $condition: ModelTeamUserConditionInput
  ) {
    deleteTeamUser(input: $input, condition: $condition) {
      teamId
      userId
      team {
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
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      name
      ownerUserId
      owner {
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
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      name
      ownerUserId
      owner {
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
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      name
      ownerUserId
      owner {
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
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      phoneNumber
      preferredLanguage
      avatar
      creationDate
    }
  }
`;
