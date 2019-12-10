import { Injectable } from '@angular/core';
import * as _ from 'lodash';
// app imports
import { ObjectLocalStorageService } from '../storage/object-local-storage.service';
import { UserConfigModel } from './user-config.model';
import { AppVariables } from '../../static/app-variables';

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  private userConfigLsKey = AppVariables.LOCAL_STORAGE_USER_CONFIG;

  constructor(
    private objectLocalStorageService: ObjectLocalStorageService,
  ) {
  }

  private getConf(): UserConfigModel {
    return this.objectLocalStorageService.getItem(this.userConfigLsKey);
  }

  private isConfigCorrect(userConfig: UserConfigModel): boolean {
    const configKeys = _.keys(userConfig);
    return configKeys.every((key) => configKeys.indexOf(key) >= 0);
  }

  private getConfigEmpty(): UserConfigModel {
    return Object.create({});
  }

  private setConfig(config: UserConfigModel) {
    this.objectLocalStorageService.setItem(this.userConfigLsKey, config);
  }
}
