export const constants = {
    JWT: {
      SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
      EXPIRY: '24h',
    },
    RATE_LIMIT: {
      WINDOW_MS: 15 * 60 * 1000, // 15 minutes
      MAX_REQUESTS: 100,
      LOGIN_WINDOW_MS: 60 * 60 * 1000, // 1 hour
      MAX_LOGIN_ATTEMPTS: 5,
    },
    PASSWORD: {
      MIN_LENGTH: 8,
      SALT_ROUNDS: 10,
    },
  };
  