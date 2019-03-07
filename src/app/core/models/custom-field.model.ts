import { ExtendedFieldDefinition } from './extended-field-definition.model';
import { ExtendedField } from './extended-field.model';
import { RequestFieldDefinition } from './request-field-definition.model';
import { RequestField } from './request-field.model';

export type CustomField = ExtendedField | RequestField;
export type CustomFieldDefinition = ExtendedFieldDefinition | RequestFieldDefinition;
