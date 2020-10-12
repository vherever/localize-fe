import { ProjectModel } from '../models/project.model';

export class LocaleHelper {
  static getDefaultLocale(projectData: ProjectModel): string {
    if (!projectData.isShared) {
      return projectData.defaultLocale;
    } else {
      const localesArray = projectData.availableTranslationLocales.split(',');
      const found = localesArray.find((locale: string) => locale === projectData.defaultLocale);
      if (found) {
        return projectData.defaultLocale;
      }
      return localesArray[0];
    }
  }
}
