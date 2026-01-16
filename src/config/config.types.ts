export interface UserConfig {
  ipHost: string;
  userHost: string;
  passwordHost: string;
  hotspotName: string;
  dnsName: string;
  currency: string;
  phone: string;
  email: string;
  infoLp: string;
  idleTimeout: string;
  sessionName: string;
  report: string;
  token: string;
}

export interface AdminConfig {
  user: string;
  pass: string;
}

export interface AppConfig {
  user: UserConfig;
  admin: AdminConfig;
}
