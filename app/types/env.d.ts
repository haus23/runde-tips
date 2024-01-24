declare namespace NodeJS {
  export interface ProcessEnv {
    PLUNK_API_KEY: string;
    ENCRYPTION_SECRET: string;
    AUTH_SESSION_SECRET: string;
    THEME_SESSION_SECRET: string;
  }
}
