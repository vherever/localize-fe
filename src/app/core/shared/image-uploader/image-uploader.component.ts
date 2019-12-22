import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserService } from '../../services/api-interaction/user.service';
import { ImageUploaderHelper } from './image-uploader-helper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.scss'],
})
export class ImageUploaderComponent extends ImageUploaderHelper implements AfterViewInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() userId: number;
  @Input() uuid: string;
  @Output() avatarUpdated: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectFileInput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  selectedImage: File = null;

  constructor(
    private userInfoService: UserService,
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
      this.userInfoService.uploadAvatar(this.userId, fd)
        .pipe(untilComponentDestroyed(this))
        .subscribe((res: {fileName: string}) => {
          this.avatarUpdated.emit(res.fileName);
        });
    }
  }
}
