export interface TranslationModel {
  id: number;
  created: Date;
  updated: Date;
  translations: Translations;
  assetCode: string;
  assetProjectCode: string;
  context: string;
  notes: string;
  status: string;
  projectId: number;
  authorId?: number;
  labels: string;
}

interface Translations {
  [key: string]: string;
}
