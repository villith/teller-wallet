import { StyleRulesCallback, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import * as React from 'react';

export interface ITransactionListToolbarProps {
  numSelected: number;
}

export interface ITransactionListToolbarState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    display: 'flex',
  },
  cancelButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
  },
  confirmButton: {
    backgroundColor: 'white',
    color: '#4caf50',
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    '&:hover': {
      backgroundColor: lighten('#4caf50', 0.85)
    }
  },
  highlight:
  theme.palette.type === 'light'
    ? {
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        color: theme.palette.secondary.main,        
      }
    : {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.text.primary,
      },
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});

class TransactionListToolbar extends React.Component<WithStyles<any> & ITransactionListToolbarProps, ITransactionListToolbarState> {
  public render() {
    const { classes, numSelected } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='title' id='tableTitle'>
              Transaction List
            </Typography>
          )}
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(TransactionListToolbar)