export interface TranslationModel {
  id: number;
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
}

interface Translations {
  [key: string]: string;
}
