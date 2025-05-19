export interface ShareModalData {
  inviteUrl: string;
  sharedMembers: {
    nickname: string;
    role: string;
  }[];
}

export interface InviteUserByEmail {
  projectId: string;
  inviteMember: string;
  code: string;
}
