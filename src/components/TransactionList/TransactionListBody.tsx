import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { getContact } from '../../helpers/utils';
import { IUser } from '../../interfaces/User';
import { Order } from './TransactionListContainer';
import TransactionListRow from './TransactionListRow';

export interface ITransactionListBodyProps {
  currentTransaction: Transaction;
  order?: Order;
  orderBy?: string;
  handleClick: (event: any, id: string) => void;
  transactions: Transaction[];
  user: IUser;
  numRows?: number;
  contacts: Contact[];
}

export interface ITransactionListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListBody extends React.Component<WithStyles<any> & ITransactionListBodyProps, ITransactionListBodyState> {
  public render() {
    const { currentTransaction, contacts, handleClick, transactions, numRows, user } = this.props;
    return (
      <TableBody>
        {(numRows ? transactions.slice(0, numRows) : transactions)
          .map((transaction) => {
            const { id } = transaction;
            const isSelected = currentTransaction.id === id;
            const incoming = transaction.to === user.address;
            const contactKey = incoming ? transaction.from : transaction.to;
            const contact = getContact(contacts, contactKey);
            return <TransactionListRow
              isSelected={isSelected}
              key={id}
              transaction={transaction}
              handleClick={handleClick}
              user={user}
              contact={contact}
            />
          })
        }
      </TableBody>
    );
  }
}

export default withStyles(styles)(TransactionListBody)