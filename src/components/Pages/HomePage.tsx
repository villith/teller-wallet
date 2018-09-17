import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import ProfileCard from '../Card/ProfileCard';
import ListContainer, { ListType } from '../List/ListContainer';
import NewsFeedContainer from '../NewsFeed/NewsFeedContainer';
import { Aux } from '../winAux';

export interface IHomePageRowProps {
  currentTransaction: Transaction;
  handleSelectRow: (id: string, listType: ListType) => void;
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
}

export interface IHomePageRowState {
  placeholder?: string;
}

const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Timestamp' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To / From' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  address: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    overflowWrap: 'break-word',
    wordWrap: 'break-word'
  },
  card: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center'
  },
  cardHeader: {
    height: '55%',
    width: '100%',
    overflow: 'hidden'
  },
  content: {
    maxWidth: '100%'
  },
  mediaContainer: {
    padding: theme.spacing.unit
  },
  media: {
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain !important'
  },
  user: {
    marginBottom: theme.spacing.unit * 3
  }
});

class HomePageRow extends React.Component<WithStyles<any> & IHomePageRowProps, IHomePageRowState> {
  public render() {
    const { classes, contacts, currentTransaction, handleSelectRow, transactions, user } = this.props;
    return (
      <Aux>
        <Grid item={true} xs={8}>
          <Grid item={true} xs={12} className={classes.user}>
            <ProfileCard
              user={user}
              transactions={transactions}
            />
          </Grid>
          <Grid item={true} xs={12} className={classes.transactionList}>
            <ListContainer
              columns={columnData}
              currentData={currentTransaction}
              data={transactions}
              user={user}
              handleSelectRow={handleSelectRow}
              listType={'Transaction'}
              listName={'Recent Transactions'}
              numRows={5}
              sortable={false}
              contacts={contacts}
            />
          </Grid>
        </Grid>
        <Grid item={true} xs={4} className={classes.newsFeed}>
          <NewsFeedContainer />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(HomePageRow)