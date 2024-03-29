/**
 * sort by columns:
 * created (*_asc, *_desc): timestamp 2020-01-06 12:55:53.852426
 * updated (*_asc, *_desc): timestamp 2020-01-06 12:55:53.852426
 * title (*_asc, *_desc): string
 * name (*_asc, *_desc): string
 */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SortingHelper {
  sortData(source: Observable<any>, key: string): any {
    const sortKey = this.getRawKey(key);
    switch (key) {
      case 'name_asc':
      case 'title_asc':
        return source
          .pipe(
            map((data: any[]) => {
              return data.slice().sort((a, b) => {
                if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) {
                  return -1;
                }
                if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) {
                  return 1;
                }
                return 0;
              });
            }),
          );
      case 'name_desc':
      case 'title_desc':
        return source
          .pipe(
            map((data: any[]) => {
              return data.slice().sort((a, b) => {
                if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) {
                  return -1;
                }
                if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) {
                  return 1;
                }
                return 0;
              });
            }),
          );
      case 'created_asc':
      case 'updated_asc':
        return source
          .pipe(
            map((data: any[]) => {
              return data.slice().sort((a, b) => {
                const keyA = new Date(a[sortKey]);
                const keyB = new Date(b[sortKey]);
                if (keyA < keyB) {
                  return -1;
                }
                if (keyA > keyB) {
                  return 1;
                }
                return 0;
              });
            }),
          );
      case 'created_desc':
      case 'updated_desc':
        return source
          .pipe(
            map((data: any[]) => {
              return data.slice().sort((a, b) => {
                const keyA = new Date(a[sortKey]);
                const keyB = new Date(b[sortKey]);
                if (keyA > keyB) {
                  return -1;
                }
                if (keyA < keyB) {
                  return 1;
                }
              });
            }),
          );
    }
  }

  private getRawKey(key: string): string {
    let sortKey = '';
    if (key) {
      if (key.includes('_desc')) {
        sortKey = key.replace('_desc', '');
      } else if (key.includes('_asc')) {
        sortKey = key.replace('_asc', '');
      } else {
        sortKey = key;
      }
    }
    return sortKey;
  }
}
