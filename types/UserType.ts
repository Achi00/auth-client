export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  email_verified: number;
  verification_token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
}
