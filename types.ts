
export interface Note {
  id: number;
  title: string;
  transcript: string;
  summary: string;
  tags: string[];
  createdAt: string;
}

export interface ProcessedNoteData {
  title: string;
  summary:string;
  tags: string[];
}
