import { UserType } from "./UserType";

export type UserContextType = {
  user: UserType | null;
  loading: boolean;
  logout: () => Promise<void>;
};
