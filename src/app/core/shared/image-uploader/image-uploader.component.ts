import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserService } from '../../services/api-interaction/user.service';
import { ImageUploaderHelper } from './image-uploader-helper';
import { AppStateModel } from '../../../store/models/app-state.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UpdateUserAvatarAction } from '../../../store/actions/user.actions';

@Component({
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.scss'],
})
export class ImageUploaderComponent extends ImageUploaderHelper implements AfterViewInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() userId: number;
  @Input() uuid: string;
  @Output() selectFileInput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  selectedImage: File = null;

  constructor(
    private userInfoService: UserService,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.selectFileInput.emit(this.fileInput);
  }

  ngOnDestroy() {
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const fd = new FormData();
      fd.append('image', this.selectedImage, this.getFileName(event, this.uuid));
      this.store.dispatch(new UpdateUserAvatarAction({ uuid: this.uuid, file: fd }));
    }
  }
}
