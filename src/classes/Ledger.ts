import { Transaction } from './Transaction';

enum LedgerType {
  MY_LEDGER = 0,
  WITNESS_LEDGER = 1,
}

class Ledger {
  /** Array of Transactions */
  public entries: Transaction[];

  /** Type of ledger */
  public LedgerType: LedgerType;

  /** Creates an instance of Ledger. */
  // tslint:disable-next-line:no-shadowed-variable
  constructor(entries: Transaction[], LedgerType: LedgerType) {
    this.entries = entries;
    this.LedgerType = LedgerType;
  }
}

export { Ledger, LedgerType };