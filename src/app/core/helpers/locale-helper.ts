import { ProjectModel } from '../models/project.model';

export class LocaleHelper {
  static getDefaultLocale(projectData: ProjectModel, localesData?: any[]): any {
    let locale: string;
    if (!projectData.isShared) {
      locale = projectData.defaultLocale;
    } else {
      const localesArray = projectData.availableTranslationLocales.split(',');
      const found = localesArray.find((l: string) => l === projectData.defaultLocale);
      if (found) {
        locale = projectData.defaultLocale;
      }
      locale = localesArray[0];
    }
    return localesData.find((o: any) => o.keyCode === locale);
  }
}
