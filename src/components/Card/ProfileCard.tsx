import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  StyleRulesCallback,
  Theme,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { FileCopy as FileCopyIcon } from '@material-ui/icons';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { getBalance, getFullName } from '../../helpers/utils';
import { IUser } from '../../interfaces/User';

export interface IProfileCardProps {
  transactions: Transaction[];
  user: IUser;
}

export interface IProfileCardState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  address: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    padding: theme.spacing.unit * 1.75,
  },
  addressContainer: {
    backgroundColor: 'rgb(246, 248, 250)',
  },
  balance: {
    float: 'right',
    textAlign: 'right'
  },
  card: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2
  },
  cardHeader: {
    height: '55%',
    width: '100%',
    overflow: 'hidden'
  },
  copyIcon: {
    display: 'flex',
    margin: 'auto',
    height: '100%'
  },
  mediaContainer: {
    padding: theme.spacing.unit
  },
  media: {
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain !important'
  },
  copyToClipboard: {

  }
});

class ProfileCard extends React.Component<WithStyles<any> & IProfileCardProps, IProfileCardState> {
  public copyToClipboard = () => {
    const addressEl = document.getElementById('address') as HTMLInputElement;
    if (addressEl) {
      addressEl.select();
      document.execCommand('copy');
      console.log('Copied');
    }
  }
  public render() {
    const { classes, transactions, user } = this.props;
    const balance = getBalance(transactions, user.address);
    const conversionRate = 1.38;
    const convertedBalance = balance * conversionRate;
    return (
      <Card className={classes.card} elevation={4}>
        <Grid container={true}>
          <Grid item={true} xs={3} className={classes.mediaContainer}>
            <CardMedia
              className={classes.media}
              image='icon.png'
            />
          </Grid>
          <Grid item={true} container={true} xs={9}>
            <Grid item={true} xs={12}>
              <Typography variant='headline'>{getFullName(user)}</Typography>
            </Grid>
            <Grid item={true} container={true} xs={12} className={classes.addressContainer}>
              <Grid item={true} xs={11}>
                <Typography className={classes.address} variant='caption'>{user.address}</Typography>
              </Grid>
              <Grid item={true} xs={1}>
                <Tooltip title='Copy Address'>
                  <IconButton className={classes.copyIcon} onClick={this.copyToClipboard}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item={true} xs={12} className={classes.balance}>
              <Typography variant='subheading'>BALANCE:&nbsp;<strong>{balance} TEL</strong></Typography>
              <Typography variant='caption'> ${convertedBalance.toFixed(2)} @ ${conversionRate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfileCard)