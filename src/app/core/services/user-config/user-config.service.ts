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

  private userConfigKeys: string[] = [
    'projectsActiveTab',
    'projectsActiveSortKey',
  ];

  constructor(
    private objectLocalStorageService: ObjectLocalStorageService,
  ) {
  }

  private getConf(): UserConfigModel {
    const value = this.objectLocalStorageService.getRawItem(this.userConfigLsKey);
    if (!this.objectLocalStorageService.isJsonString(value)) {
      this.objectLocalStorageService.removeItem(this.userConfigLsKey);
    }
    return this.objectLocalStorageService.getItem(this.userConfigLsKey);
  }

  private isConfigCorrect(userConfig: UserConfigModel): boolean {
    const configKeys = _.keys(userConfig);
    return configKeys.length === this.userConfigKeys.length
      && this.userConfigKeys.every((key) => configKeys.indexOf(key) >= 0);
  }

  private getConfigEmpty(): UserConfigModel {
    return {
      projectsActiveTab: '',
      projectsActiveSortKey: '',
    };
  }

  private setConf(config: UserConfigModel) {
    this.objectLocalStorageService.setItem(this.userConfigLsKey, config);
  }

  getItem<T>(key: string): T {
    const conf: UserConfigModel = this.getConf();
    if (conf && this.userConfigKeys.indexOf(key) >= 0) {
      if (this.userConfigKeys.indexOf(key) >= 0) {
        return conf[key];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  setItem<T>(key: string, data: T): void {
    const conf: UserConfigModel = this.getConf() || this.getConfigEmpty();
    if (this.userConfigKeys.indexOf(key) >= 0) {
      conf[key] = data;
    }
    this.setConf(conf);
  }

  removeItem(key: string): void {
    const conf: UserConfigModel = this.getConf();
    if (conf) {
      if (this.userConfigKeys.indexOf(key) >= 0) {
        delete conf[key];
      }
      this.setConf(conf);
    }
  }

}
