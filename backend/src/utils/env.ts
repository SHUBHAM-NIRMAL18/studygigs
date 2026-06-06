import dotenv from 'dotenv';
dotenv.config();

export function validateEnv() {
  const required = ['DATABASE_URL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`[CRITICAL] Missing required environment variables: ${missing.join(', ')}`);
    console.error('[CRITICAL] Please set these variables in backend/.env file.');
    process.exit(1);
  }

  // Soft check for database URL protocol
  const dbUrl = process.env.DATABASE_URL || '';
  if (!dbUrl.startsWith('mysql://')) {
    console.warn(`[WARNING] DATABASE_URL does not start with "mysql://". Current prefix is: "${dbUrl.split(':')[0]}". Ensure you are using MySQL database protocol for production.`);
  }

  console.log('[ENV] Environment variables validated successfully.');
}
