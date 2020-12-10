import { UserModel } from './user.model';
import { SharedWithUserModel } from './shared-with-user.model';
import { TagInterface } from '../shared/tags-manager-dialog/tags-list/tag.model';

export interface ProjectModel {
  id: number;
  uuid: string;
  title: string;
  description: string;
  defaultLocale: string;
  translationsLocales: string;
  availableTranslationLocales?: string;
  ownerId: number;
  userId: number;
  created: Date;
  updated: Date;
  latestUpdatedAtFormatted: string;
  role: string;
  sharedUsers: UserModel[];
  sharedWith: SharedWithUserModel[];
  translationsCount: number;
  isShared?: boolean;
  labels: TagInterface[];
}
