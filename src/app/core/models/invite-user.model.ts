export interface InviteUserModel {
  targetEmail: string;
  projectId: number;
  role?: string;
  userId?: number;
}
