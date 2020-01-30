import { CountryModel, LocalesModel } from '../models/locales.model';

export class LocalesHelper {
  formatData(data) {
    const countries = data.countries;
    const languages = data.languages;
    const countries_ = [];

    Object.keys(countries).forEach((key) => {
      countries[key]['key'] = key.toLowerCase();
      countries_.push(countries[key]);
      countries[key].locales = [];

      Object.keys(languages).forEach((l) => {
        countries[key].languages.forEach((k) => {
          if (l === k) {
            countries[key].locales.push({ name: languages[l].name, native: languages[l].native, code: k });
          }
        });
      });

      countries[key].languages = countries[key].locales;
      delete countries[key].phone;
      delete countries[key].continent;
      delete countries[key].capital;
      delete countries[key].currency;
      delete countries[key].emojiU;
    });

    return {
      countries: countries_,
      languages,
    };
  }

  getResult(value, data: any) {
    const val = value.toLowerCase();
    const temp = [];

    let res = data.countries.filter((o) => {
      const namesArr = o.name.toLowerCase().split(' ');
      return o.locales.find((l) => {
        if (o.name.toLowerCase().startsWith(val)) {
          return temp;
        } else {
          namesArr.forEach((n) => {
            if (n.startsWith(val)) {
              temp.push(o);
              return temp;
            }
          });
          if (l.name.toLowerCase().startsWith(val)) {
            o.locales = o.locales.filter((p) => p.code === l.code);
            return temp;
          }
        }
      });
    });

    res = res.concat(temp.filter((a, b) => temp.indexOf(a) === b));

    for (const l in data.languages) {
      if (data.languages[l].name.toLowerCase().startsWith(val) || l.startsWith(val)) {
        res.unshift(Object.assign({ code: l, filter: data.languages[l].name + ' ' + l, value: data.languages[l].name, type: 'lang' }, data.languages[l]));
      }
    }

    return [...res].reduce((acc, o: any) => {
      if (o.locales) {
        o.locales.forEach((l) => {
          const d = {
            value: o.locales ? l.name + ' (' + o.name + ')' : o.name,
            filter: o.locales ? l.name + ' ' + o.name : o.name,
            code: o.key ? o.key : o.code,
            emoji: o.emoji,
            keyCode: o.key + '-' + l.code,
          };
          acc.push(d);
        });
      } else {
        acc.push(o);
        o.keyCode = o.code;
      }
      return acc;
    }, []);
  }

  getActiveLocaleCountryName(locale: string, localesData): string {
    const splitted = locale.split('-');

    let language;
    let country;
    let result;

    if (splitted.length > 1) {
      country = localesData['countries'].find((c) => c.key === splitted[0]).name;
      language = localesData['languages'][splitted[1]].name;
      result = `${language} (${country})`;
    } else {
      language = localesData['languages'][splitted[0]].name;
      result = language;
    }

    return result;
  }
}
