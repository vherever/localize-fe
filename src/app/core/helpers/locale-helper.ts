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

  private static prepareAvailableTranslations(projectLocales: string, availableTranslations: string[], languagesData: any) {
    const result: any[] = [];
    projectLocales.split(',').forEach((loc1: string) => {
      let found: any = languagesData.find((l) => l.keyCode === loc1);
      found = { ...found, editable: false };
      result.push(found);
      const d = result.find((loc) => loc.keyCode === loc1);
      availableTranslations.forEach((loc2: string) => {
        if (loc1 === loc2) {
          d.editable = true;
        }
      });
    });

    return result;
  }

  static prepareLocales(translationsLocales: string, availableTranslationLocales: string, localesData: any[]): any[] {
    return this.prepareAvailableTranslations(
      translationsLocales,
      availableTranslationLocales.split(','),
      localesData,
    );
  }
}
