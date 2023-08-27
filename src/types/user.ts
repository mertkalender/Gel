export type UserResponse = {
  children: User[];
};
export type User = {
  userName: string;
  name: string;
  surname: string;
  profilePicture: string;
};

export type ImageData = {
  url: string;
  title: string;
  author: string;
  is_video: boolean;
  created_utc: number;
};
