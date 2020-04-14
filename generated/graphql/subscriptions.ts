// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateDescriptor = /* GraphQL */ `
  subscription OnCreateDescriptor {
    onCreateDescriptor {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const onUpdateDescriptor = /* GraphQL */ `
  subscription OnUpdateDescriptor {
    onUpdateDescriptor {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const onDeleteDescriptor = /* GraphQL */ `
  subscription OnDeleteDescriptor {
    onDeleteDescriptor {
      id
      teamId
      sections {
        name
      }
      target
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact {
    onCreateContact {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact {
    onUpdateContact {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact {
    onDeleteContact {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
