import { UserModel } from './user.model';

export interface TranslationModel {
  id: number;
  uuid: string;
  latestUpdatedAtFormatted: string;
  translations: Translations;
  assetCode: string;
  assetProjectCode: string;
  context: string;
  notes: string;
  status: string;
  projectId: number;
  authorId?: number;
  labels: string;
  author: string;
  updatedBy: UserModel;
}

interface Translations {
  [key: string]: string;
}
