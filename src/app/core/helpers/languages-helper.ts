export class LanguagesHelper {
  static getResult(value: string, data: any[]) {
    const val = value.toLowerCase();
    return data.filter((o: any) => o.filter.toLowerCase().includes(val));
  }

  static getActiveLocaleObj(locale: string, languagesData): any {
    return languagesData.find((l: any) => l.keyCode === locale);
  }
}
