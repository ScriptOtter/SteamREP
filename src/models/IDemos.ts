import { ISteamUser } from "./ISteamUser";

interface IAuthor {
  steamUser: ISteamUser;
}
interface IVerdicts {
  verdicts: string[];
  comment: string;
  createdAt: string;
}
export interface IDemos {
  id?: number;
  youtubeLink: string;
  demoLink: string;
  reasonsReport: string[];
  comment: string;
  authorId?: string;
  recipientId?: string;
  createdAt: string;
  updatedAt?: string;
  author: IAuthor;
  recipient: ISteamUser;
  verdicts?: IVerdicts[];
  updateDemos?: () => void;
}
