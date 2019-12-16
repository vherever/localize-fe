import { Component, Input, OnDestroy } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserInfoService } from '../../../home/dashboard/user-info/user-info.service';
import { ImageUploaderHelper } from './image-uploader-helper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.scss'],
})
export class ImageUploaderComponent extends ImageUploaderHelper implements OnDestroy {
  @Input() userId: number;
  @Input() uuid: string;

  selectedImage: File = null;

  constructor(
    private userInfoService: UserInfoService,
  ) {
    super();
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
        .subscribe((res) => {
          console.log('___ res', res); // todo
        });
    }
  }
}
