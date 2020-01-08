import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  filterText: string;

  onNotifyFilter(message: string): void {
    this.filterText = message;
  }
}
