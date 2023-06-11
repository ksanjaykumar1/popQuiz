export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'test' | 'dev' | 'prod';
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}
