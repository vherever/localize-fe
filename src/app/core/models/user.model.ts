import { ProjectModel } from './project.model';

export interface UserModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  projects: ProjectModel[];
}
