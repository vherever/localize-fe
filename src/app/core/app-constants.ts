import { environment } from '../../environments/environment';

export const API_URL = environment.apiUrl;
export const UPLOADS_ENDPOINT = `${API_URL}/uploads`;

export const DEVELOPER = 'developer';

export enum UserRoles {
  TRANSLATOR = 'TRANSLATOR',
  DEVELOPER = 'DEVELOPER',
  MANAGER = 'MANAGER',
}
