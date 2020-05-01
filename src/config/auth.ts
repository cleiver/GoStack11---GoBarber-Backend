/**
 * Configuration file used by the authentication middleware
 */
export default {
  jwt: {
    secret: 'insert-hash-salt-here',
    expiresIn: '1d',
  },
};
