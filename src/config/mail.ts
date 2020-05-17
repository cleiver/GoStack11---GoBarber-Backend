interface IMailConfiguration {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Do Not Reply',
      email: 'no-reply@cleiver.me',
    },
  },
} as IMailConfiguration;