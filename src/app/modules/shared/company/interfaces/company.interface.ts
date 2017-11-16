import { CompanyNames } from "./company-names.interface";
import { Address } from "./company-address.interface";
import { CompanyContact } from "./company-contact.interface";
import { CompanyPersonContact } from "./company-person-contact.interface";


export interface Company{
  readonly names: CompanyNames;
  readonly address: Address;
  readonly contact: CompanyContact;
  readonly contacts: Array<CompanyPersonContact>;

}
