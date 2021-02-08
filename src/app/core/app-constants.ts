import { environment } from '../../environments/environment';

export const API_URL = environment.apiUrl;
export const UPLOADS_ENDPOINT = `${API_URL}/uploads`;

export const DEVELOPER = 'developer';

export enum UserRoles {
  TRANSLATOR = 'TRANSLATOR',
  DEVELOPER = 'DEVELOPER',
  MANAGER = 'MANAGER',
}

export const FILE_FORMATS = [
  {
    id: 1,
    value: 'json',
    text: 'JSON',
  },
  {
    id: 2,
    value: 'php',
    text: 'PHP',
  },
];

export const ASSET_TYPES_JSON = [
  {
    id: 1,
    value: 'key_value_pairs',
    text: 'key/value pairs',
  },
  {
    id: 2,
    value: 'multi_language_nesting',
    text: 'multi-language nesting array'
  }
];

export const ASSET_TYPES_PHP = [
  {
    id: 1,
    value: 'php_array',
    text: 'PHP array',
  },
  {
    id: 2,
    value: 'php_lang_array',
    text: 'PHP $lang array',
  },
  {
    id: 3,
    value: 'php_constant_definitions',
    text: 'Constant definitions',
  },
];
