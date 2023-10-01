export type UserResponse = {
  children: User[];
};
export type User = {
  name: string;
  surname: string;
  email: string;
  profilePicture?: string;
};
