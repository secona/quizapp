declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    
    /** the root url without trailing backslash */
    ROOT_URL: string;
  }
}
