// tslint:disable
// this is an auto generated file. This will be overwritten

export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const getStreamToken = /* GraphQL */ `
  query GetStreamToken($teamId: String) {
    getStreamToken(teamId: $teamId) {
      token
      feedName
      feedId
    }
  }
`;
export const getStreamNotificationToken = /* GraphQL */ `
  query GetStreamNotificationToken($teamId: String) {
    getStreamNotificationToken(teamId: $teamId) {
      token
      feedName
      feedId
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($teamId: ID!, $id: ID!) {
    getProduct(teamId: $teamId, id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
  }
`;
export const getSupplier = /* GraphQL */ `
  query GetSupplier($teamId: ID!, $id: ID!) {
    getSupplier(teamId: $teamId, id: $id) {
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
export const listSuppliers = /* GraphQL */ `
  query ListSuppliers(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelSupplierFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSuppliers(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        teamId
        name
        fullName
        tradingName
      }
      nextToken
    }
  }
`;
export const getDescriptor = /* GraphQL */ `
  query GetDescriptor($teamId: ID!, $id: ID!) {
    getDescriptor(teamId: $teamId, id: $id) {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const listDescriptors = /* GraphQL */ `
  query ListDescriptors(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelDescriptorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDescriptors(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        teamId
        target
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($teamId: ID!, $id: ID!) {
    getCategory(teamId: $teamId, id: $id) {
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
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategorys(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($teamId: ID!, $id: ID!) {
    getContact(teamId: $teamId, id: $id) {
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
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContacts(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($teamId: ID!, $id: ID!) {
    getImage(teamId: $teamId, id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listImages(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($teamId: ID!, $id: ID!) {
    getTask(teamId: $teamId, id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $teamId: ID
    $id: ModelIDKeyConditionInput
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTasks(
      teamId: $teamId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
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
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const getTeamUser = /* GraphQL */ `
  query GetTeamUser($teamId: ID!, $userId: ID!) {
    getTeamUser(teamId: $teamId, userId: $userId) {
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
export const listTeamUsers = /* GraphQL */ `
  query ListTeamUsers(
    $teamId: ID
    $userId: ModelIDKeyConditionInput
    $filter: ModelTeamUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeamUsers(
      teamId: $teamId
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        teamId
        userId
        role
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const user = /* GraphQL */ `
  query User($id: ID!) {
    user(id: $id) {
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
export const listTeamUserByUser = /* GraphQL */ `
  query ListTeamUserByUser(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTeamUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamUserByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        teamId
        userId
        role
      }
      nextToken
    }
  }
`;
