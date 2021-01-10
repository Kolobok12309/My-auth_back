

export interface IMailingOptions {
  template: string;

  subject: string;

  context?: {
    [key: string]: any
  }
}
