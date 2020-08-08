export interface SharedWithUserModel {
  targetId: number;
  senderId: number;
  projectId: number;
  projectUuid: string;
  role: string;
  translationLocales: string;
  availableTranslationLocales: string;
}
