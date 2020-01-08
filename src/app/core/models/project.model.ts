import { UserModel } from './user.model';

export interface ProjectModel {
  id: number;
  title: string;
  description: string;
  defaultLocale: string;
  translationsLocales: string;
  ownerId: number;
  userId: number;
  created: Date;
  updated: Date;
  latestUpdatedAtFormatted: string;
  role: string;
  sharedUsers: UserModel[];
  translationsCount: number;
}
