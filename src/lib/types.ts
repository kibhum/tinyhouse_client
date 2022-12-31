export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  walletId: boolean | null;
  didRequest: boolean;
}
