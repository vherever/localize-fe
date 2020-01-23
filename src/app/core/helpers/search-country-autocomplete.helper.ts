import { CountryModel, LocalesModel } from '../models/locales.model';

export class SearchCountryAutocompleteHelper {
  getResult(value, data: LocalesModel) {
    console.log('___ data', data); // todo
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
      if (data.languages[l].name.toLowerCase().startsWith(val)) {
        res.unshift(Object.assign({ code: l, value: data.languages[l].name, type: 'lang' }, data.languages[l]));
      }
    }

    return [...res].reduce((acc, o: CountryModel) => {
      console.log('___ o', o); // todo
      if (o.locales) {
        o.locales.forEach((l) => {
          const d = {
            value: o.locales ? l.name + ' (' + o.name + ')' : o.name,
            code: o.key ? o.key : o.code,
            emoji: o.emoji,
          };
          acc.push(d);
        });
      } else {
        acc.push(o);
      }
      return acc;
    }, []);
  }
}
