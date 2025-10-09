export interface conferenceData {
  projectId: string;
  projectName: string;
  imageUrl: string;
  updateAt: string;
  scriptions?: scriptionsData[];
  summary?: summarysWithTitleData;
}

export interface scriptionsData {
  time: string;
  script: string;
}

export interface summarysWithTimeData {
  time: string;
  summary: string;
}

export interface summarysWithTitleData {
  title: string;
  content: string;
}
