import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
})
export class FilterComponent implements OnInit {
  @Input() placeholder: string;
  @Input() cssClass: string;

  @Output() notifyFilter: EventEmitter<string> = new EventEmitter<string>();

  filterInput = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.filterInput
      .valueChanges
      .pipe(
        debounceTime(200),
      )
      .subscribe((term) => {
        this.notifyFilter.emit(term);
      });
  }
}
