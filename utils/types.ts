export type AuthSchemaType = "login" | "sign-up";

export type FormAction = (
  data: any
) => Promise<{ message: string; payload: any }>;

export type FileType = "documents" | "media" | "images" | "others";

export type OptionsDialog = {
  heading: string;
  description?: string;
  component: React.ReactNode;
};

export type FilesLayoutType = "grid" | "list";

export type FilesSortType = "latest" | "a-z" | "z-a" | "l-s" | "s-l";

export type FileStatsType = {
  type: FileType;
  size: number;
  total: number;
  lastUpdated: string;
};
