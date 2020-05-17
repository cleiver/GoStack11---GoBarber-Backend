/**
 * Configuration file used by the authentication middleware
 */
export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
