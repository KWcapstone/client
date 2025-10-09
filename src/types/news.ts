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
  url: string;
  official: boolean;
  isRead: boolean;
}
