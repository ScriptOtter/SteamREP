export interface IAuth {
  id?: string | null;
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
  steamid?: string | null;
  country?: string | null;
  role?: string | null;
  isAuth: boolean;
}
