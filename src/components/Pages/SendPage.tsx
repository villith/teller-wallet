import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import ListContainer, { ListType } from '../List/ListContainer';
import SendForm from '../Send/SendForm';
import { Aux } from '../winAux';

export interface ISendPageProps {
  currentContact: Contact;
  currentTransaction: Transaction;
  handleSelectRow: (id: string, listType: ListType) => void;
  handleChangeContact: (id: string) => void;
  user: IUser;
  contacts: Contact[];
  transactions: Transaction[];
}

export interface ISendPageState {
  placeholder?: string;
}

const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Timestamp' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To / From' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class SendPage extends React.Component<WithStyles<any> & ISendPageProps, ISendPageState> {
  public render() {
    const { currentContact, currentTransaction, handleChangeContact, handleSelectRow, contacts, transactions, user } = this.props;
    const data = transactions.filter(tx => (tx.to === currentContact.address) || (tx.from === currentContact.address));
    return (
      <Aux>
        <Grid item={true} xs={8}>
          <SendForm
            contacts={contacts}
            currentContact={currentContact}
            handleChangeContact={handleChangeContact}
            user={user}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ListContainer
            columns={columnData}
            currentData={currentTransaction}
            listType={'Transaction'}
            data={data}
            handleSelectRow={handleSelectRow}
            user={user}
            listName={`Transactions with ${currentContact.firstName} ${currentContact.lastName}`}
            sortable={true}
            filterable={false}
            transactions={transactions}
            contacts={contacts}
            placeholderImage={'list.svg'}
            placeholderText={'No Transactions Found'}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(SendPage)