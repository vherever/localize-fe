export interface InviteUserModel {
  targetEmail: string;
  projectUuid: string;
  role?: string;
  availableTranslationLocales?: string;
  userId?: number;
}
