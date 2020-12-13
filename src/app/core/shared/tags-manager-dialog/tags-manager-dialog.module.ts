import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { TagsManagerDialogComponent } from './tags-manager-dialog.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { AddEditTagComponent } from './add-edit-tag/add-edit-tag.component';
import { FilterPipeModule } from '../../pipes/filter/filter-pipe.module';
import { FilterModule } from '../filter/filter.module';
import { SpriteModule } from '../sprite/sprite.module';
import { ColorsPaletteComponent } from './colors-palette/colors-palette.component';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { RemoveTagComponent } from './remove-tag/remove-tag.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    FilterPipeModule.forRoot(),
    FilterModule,
    SpriteModule,
    FlexLayoutModule,
  ],
  declarations: [
    TagsManagerDialogComponent,
    TagsListComponent,
    AddEditTagComponent,
    RemoveTagComponent,
    ColorsPaletteComponent,
    AutofocusDirective,
  ],
  providers: [],
  entryComponents: [TagsManagerDialogComponent],
})
export class TagsManagerDialogModule {}
