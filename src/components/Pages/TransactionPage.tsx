import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import BalanceHistory from '../Charts/BalanceHistory';
import ContactView from '../Contact/ContactView';
import ListContainer, { ListType } from '../List/ListContainer';
import TransactionView from '../Transaction/TransactionView';
import { Aux } from '../winAux';

export interface ITransactionPageProps {
  contact: Contact;
  contacts: Contact[];
  currentTransaction: Transaction;
  handleSelectRow: (id: string, listType: ListType) => void;
  transactions: Transaction[];
  user: IUser;
  toggleContactFavorite?: (id: string) => void;
}

export interface ITransactionPageRowState {
  placeholder?: string;
}


const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Timestamp' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To / From' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
  widgets: {
    '&> div': {
      marginBottom: theme.spacing.unit * 1.5
    }
  }
});

class TransactionPageRow extends React.Component<WithStyles<any> & ITransactionPageProps, ITransactionPageRowState> {
  public render() {
    const { classes, contact, currentTransaction, contacts, handleSelectRow, user, toggleContactFavorite, transactions } = this.props;
    
    return (
      <Aux>
        <Grid item={true} xs={6} md={7} className={classes.widgets}>
          {currentTransaction && currentTransaction.id &&
            <TransactionView
              currentTransaction={currentTransaction}
              user={user}
            />
          }
        {contact && contact.id &&
          <ContactView
            contact={contact}
            toggleContactFavorite={toggleContactFavorite}
          />
        }
        <BalanceHistory
          transactions={transactions}
          contacts={contacts}
          user={user}
        />
      </Grid>
      <Grid item={true} xs={6} md={5}>
        <ListContainer
          columns={columnData}
          currentData={currentTransaction}
          listType={'Transaction'}
          data={transactions}
          handleSelectRow={handleSelectRow}
          user={user}
          listName={'Transaction List'}
          sortable={true}
          contacts={contacts}
          placeholderImage={'list.svg'}
          placeholderText={'No Transactions Found'}
        />
      </Grid>
    </Aux>
    );
  }
}

export default withStyles(styles)(TransactionPageRow)