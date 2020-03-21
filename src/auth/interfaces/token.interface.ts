export interface IToken {
  id: number;
  type: 'refresh' | 'access' | 'cookie';
}
