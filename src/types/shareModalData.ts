export interface ShareModalData {
  inviteUrl: string;
  sharedMembers: {
    nickname: string;
    role: string;
  }[];
}

export interface InviteUserByEmail {
  projectId: Array<string>;
  inviteMember: string;
  code: string;
}
