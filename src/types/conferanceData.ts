export interface conferenceData {
  projectId: string;
  projectName: string;
  projectImage: null;
  updatedAt: string;
  creator: string;
  scriptions?: scriptionsData[];
  summarys?: summarysWithTitleData | summarysWithTimeData[];
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
