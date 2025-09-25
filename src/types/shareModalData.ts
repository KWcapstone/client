export interface ShareModalData {
  inviteUrl: string;
  participants: {
    nickname: string;
    role: string;
  }[];
}

export interface InviteUserByEmail {
  projectId: string;
  inviteMember: string;
  code: string;
}
