import { files } from 'dropbox';

export interface GetAnnouncementsResponse {
  status: string;
  total_docs: number;
  env: {
    announcements: Array<Announcement>;
  };
}

export interface UpsertAnnouncementResponse {
  status: string;
  env: {
    announcement: Announcement;
  };
}

export interface AnnouncementBody {
  title: string;
  description: string;
  image?: files.FileMetadata;
}

export interface Announcement extends AnnouncementBody {
  _id: string;
  status: string;
  updatedAt: Date | string;
  createdAt: Date | string;
  _createdBy: string;
  isPinned: boolean;
}

export interface GetTempLinkDropBox {
  headers: Headers;
  result: files.GetTemporaryLinkResult;
  status: number;
}

export interface UploadFileDropBox {
  headers: Headers;
  result: files.FileMetadata;
  status: number;
}
