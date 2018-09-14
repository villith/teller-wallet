import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { getBalance } from '../../helpers/utils';
import { IUser } from '../../interfaces/User';
import { Aux } from '../winAux';

export interface IHomePageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
}

export interface IHomePageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  card: {
    width: '15%',
    marginLeft: '2.5%'
  },
  cardHeader: {
    height: '55%',
    width: '100%',
    overflow: 'hidden'
  },
  cardBody: {
    
  },
  cardIcon: {
    marginLeft: '-100px'
  },
  media: {
    height: '140px'
  }
});

class HomePageRow extends React.Component<WithStyles<any> & IHomePageRowProps, IHomePageRowState> { 
  public render() {
    const { classes, transactions, user } = this.props;
    
    return (
      <Aux>
        <Grid item={true} xs={12} className={classes.user}>
          <Card className={classes.card} elevation={4}>
          <div className={classes.cardHeader}>
            <CardMedia
              className={classes.media}
              image='teller_icon.png'
            />
          </div>
          <CardContent>
            <Typography variant='subheading'>ABOUT</Typography>
            <Typography variant='body1'>
              The other thing with Lorem Ipsum is that you have to take out its family.
              An ‘extremely credible source’ has called my office and told me that Barack Obama’s placeholder text is a fraud.
              We have so many things that we have to do better... and certainly ipsum is one of them. I’m the best thing that ever happened to placeholder text.
            </Typography>
          </CardContent>
          </Card>
        </Grid>
        <Paper className={classes.root}>
          {getBalance(transactions, user.address)}
        </Paper>
      </Aux>
    );
  }
}

export default withStyles(styles)(HomePageRow)