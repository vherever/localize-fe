import { Component, EventEmitter, Input, Output } from '@angular/core';
import Color from 'color';
// app imports
import { FilterService } from '../../filter/filter.service';
import { TagInterface } from './tag.model';

// const tagsPreset: TagInterface[] = [
//   { name: 'Blue', hex: '#3498db' },
//   { name: 'Orange', hex: '#ff9f1a' },
//   { name: 'Yellow', hex: '#f1c40f' },
//   { name: 'Green', hex: '#3bd27b' },
//   { name: 'Red', hex: '#ea7f74' },
//   { name: 'empty', hex: '' },
// ];

@Component({
  selector: 'app-tags-manager-dialog-tags-list',
  templateUrl: 'tags-list.component.html',
  styleUrls: ['tags-list.component.scss'],
})
export class TagsListComponent {
  @Input() tagsList: TagInterface[];
  @Output() onEditTagClickEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public filterService: FilterService,
  ) {
  }

  public onFilterNotify(value: string): void {
    this.filterService.onNotifyFilter(value);
  }

  public onTagHoverIn(color: string, tagRef: HTMLElement): void {
    if (color) {
      tagRef.style.borderLeft = `7px solid ${Color(color).darken(0.25)}`;
    }
  }

  public onTagHoverOut(tagRef: HTMLElement): void {
    tagRef.style.borderLeft = 'none';
  }

  public onTagSelect(tagUuid: string): void {
    const selectedTag = this.tagsList.find((tag: TagInterface) => tag.uuid === tagUuid);
    selectedTag.selected = !selectedTag.selected;
    console.log('selectedTag', selectedTag);
  }

  public onEditTagClick(tag: TagInterface): void {
    this.onEditTagClickEmit.emit(tag);
  }
}
