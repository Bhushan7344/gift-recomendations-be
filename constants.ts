import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'bhushan';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_PORT = process.env.DATABASE_PORT || '5432';
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'root';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'giftrecom';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
