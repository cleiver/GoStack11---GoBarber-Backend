import IMailProvider from '../models/IMailprovider';

interface IMessage {
  to: string;
  subject: string;
  content: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    this.messages.push({ to, subject, content });
  }
}
