declare namespace NodeJS {
  export interface ProcessEnv {
    /** mongodb connection string */
    MONGODB_URI: string;

    /** google client id for oauth2 */
    GOOGLE_CLIENT_ID: string;

    /** google client secret for oauth2 */
    GOOGLE_CLIENT_SECRET: string;

    /** jwt secret for access token */
    ACCESS_TOKEN_SECRET: string;
    
    /** the root url without trailing backslash */
    ROOT_URL: string;
  }
}
