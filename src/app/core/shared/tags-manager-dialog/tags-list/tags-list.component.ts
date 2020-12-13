import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Color from 'color';
// app imports
import { FilterService } from '../../filter/filter.service';
import { TagInterface } from './tag.model';
import { ColorsPaletteHelper } from '../colors-palette.helper';

@Component({
  selector: 'app-tags-manager-dialog-tags-list',
  templateUrl: 'tags-list.component.html',
  styleUrls: ['tags-list.component.scss'],
})
export class TagsListComponent implements OnInit {
  @Input() tagsList: TagInterface[];
  @Output() editTagClickEmit: EventEmitter<any> = new EventEmitter<any>();

  public tags: TagInterface[];

  constructor(
    public filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.tags = ColorsPaletteHelper.prepareColors(this.tagsList);
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
    const selectedTag = this.tags.find((tag: TagInterface) => tag.uuid === tagUuid);
    selectedTag.selected = !selectedTag.selected;
  }

  public onEditTagClick(tag: TagInterface): void {
    this.editTagClickEmit.emit(tag);
  }
}
