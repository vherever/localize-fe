import { ProjectModel } from './project.model';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  projects: ProjectModel[];
}
