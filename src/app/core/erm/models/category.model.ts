import { Entity } from '~core/erm/models/_entity.model';
import { CreateCategoryInput } from "../../../API.service";
import { User } from "./user.model";

export class Category extends Entity<CreateCategoryInput> implements CreateCategoryInput {
	  __typename: "Category";
  id: string;
  teamId: string;
  name: string;
  creationDate: number;
  createdBy: User;
  deletedBy: User | null;
  deletionDate: number | null;
  lastupdatedByUserId: string;
  lastUpdatedBy: User | null;
  lastUpdatedDate: number;
	deleted: boolean;
}
