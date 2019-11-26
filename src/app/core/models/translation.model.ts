export interface TranslationModel {
  id: number;
  sourceText: string;
  assetCode: string;
  context?: string;
  labels?: string;
  notes?: string;
  language: string;
  projectId: string;
  authorId: string;
}
