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
  @Input() projectAvailableTags: TagInterface[];
  @Input() translationTags: TagInterface[];

  @Output() editTagClickEmit: EventEmitter<TagInterface> = new EventEmitter<TagInterface>();
  @Output() selectedTagsEmit: EventEmitter<TagInterface[]> = new EventEmitter<TagInterface[]>();

  public tags: TagInterface[];

  constructor(
    public filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.markTagsSelected();
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
    const selectedTags = this.tags.filter((tag) => tag.selected);
    this.selectedTagsEmit.emit(selectedTags);
  }

  public onEditTagClick(tag: TagInterface): void {
    this.editTagClickEmit.emit(tag);
  }

  private markTagsSelected(): void {
    const preparedTags = ColorsPaletteHelper.prepareColors(this.projectAvailableTags);
    if (this.translationTags) {
      this.selectedTagsEmit.emit(this.translationTags);
      preparedTags.forEach((projectTag) => {
        this.translationTags.forEach((translationTag) => {
          if (projectTag.uuid === translationTag.uuid) {
            projectTag.selected = true;
          }
        });
      });
    }
    this.tags = preparedTags;
  }
}
