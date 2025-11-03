require('dotenv').config();

module.exports = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'your_access_secret_change_in_production',
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_change_in_production',
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  cookie: {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'strict',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  },
};
