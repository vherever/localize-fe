export class TranslationsHelper {
  public static getAvailableTranslationLocalesForUser(projectLocales: any[], availableTranslationLocales: string): any[] {
    return projectLocales.reduce((acc: any[], curr: any) => {
      const o: any = {};
      o.checked = false;
      curr = {...curr, ...o};
      availableTranslationLocales
        .split(',')
        .forEach((code: string) => {
          if (curr.keyCode === code) {
            curr.checked = true;
          }
        });
      acc.push(curr);
      return acc;
    }, []);
  }
}
