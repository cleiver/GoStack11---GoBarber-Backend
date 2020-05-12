export default interface IMailProvider {
  sendMail(to: string, subject: string, content: string): Promise<void>;
}
