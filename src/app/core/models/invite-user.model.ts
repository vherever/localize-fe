export interface InviteUserModel {
  targetEmail: string;
  projectUuid: string;
  role?: string;
  userId?: number;
}
