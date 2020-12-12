import { Injectable } from '@angular/core';
import { TagsApiService } from '../api/tags-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagsApiService: TagsApiService,
  ) {
  }

  getTags(projectUuid: string): Observable<any> {
    return this.tagsApiService.getTags(projectUuid);
  }

  createTag(projectUuid: string, data: { color: string; name: string }): Observable<any> {
    return this.tagsApiService.createTag(projectUuid, data);
  }

  updateTag(projectUuid: string, tagUuid: string, data: { color: string; name: string }): Observable<any> {
    return this.tagsApiService.updateTag(projectUuid, tagUuid, data);
  }

  removeTag(projectUuid: string, tagUuid: string): Observable<any> {
    return this.tagsApiService.removeTag(projectUuid, tagUuid);
  }
}
