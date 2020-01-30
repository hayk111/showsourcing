# Entity Metadata

This is a class that has metadata about each entity. Those metadata can help for translation, building queries, etc.


ERM

sing: EntityName
plural: EntityNamePlural
typename: string
constClass: () => new
translationKey: string
detailsUrl: string
metadata: any

EntityName
EntityNamePlural


ERMService
  - getService(entity: EntityName | string | EntityMetadata)
  - private getServiceForTypename()
	- private getServiceForERM()
	- private getServiceForEntityName()

ERM Pipe
