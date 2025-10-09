export interface newsProps {
  onCloseModal: () => void;
}

export interface newsItemData {
  noticeId: {
    timestamp: number;
    date: string;
  };
  userName: string;
  title: string;
  isRead: boolean;
}

export interface newsResponseData {}
