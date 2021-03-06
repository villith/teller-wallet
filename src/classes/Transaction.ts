class Transaction {
  public id: string;
  public from: string;
  public to: string;
  public amount: number;
  public witnessOne: string;
  public witnessTwo: string;
  public partnerOne: string;
  public partnerTwo: string;
  public signature: string;
  public timestamp: number;
  public hash: string;
  public local: boolean;
}

enum TransactionFilterables {
  from = 'from',
  to = 'to',
  amount = 'amount',
  timestamp = 'timestamp'
}

export { Transaction, TransactionFilterables };
