export interface Media {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
  path: string;
  createdAt: string;
}

export interface MediaResponse {
  success: boolean;
  message?: string;
  data: Media;
}
