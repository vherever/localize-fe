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
}
