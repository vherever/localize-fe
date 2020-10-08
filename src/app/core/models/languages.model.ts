export interface LanguagesModel {
  countries: CountryModel[];
  languages: LanguageModel;
}

export interface CountryModel {
  name: string;
  native: string;
  emoji: string;
  key: string;
  locales: LocaleModel[];
  code?: string;
  value?: string;
}
export interface LocaleModel {
  name: string;
  native: string;
  code: string;
}

export interface LanguageModel {
  [key: string]: {
    name: string;
    code?: string;
    native: string;
  };
}

export interface LocaleModelFormatted {
  code: string;
  value: string;
  type?: string;
  name?: string;
  native?: string;
  emoji?: string;
  keyCode: string;
  filter: string;
}
