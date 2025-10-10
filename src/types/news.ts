export interface newsProps {
  onCloseModal: () => void;
  newsAllResponse: newsItemData[];
  newsUnreadResponse: newsItemData[];
  errMessage: string;
  onClick: () => void;
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

export interface sideBarPropsOfNews {
  haveUnreadNews: boolean;
  setHaveUnreadNews: (value: boolean) => void;
}
