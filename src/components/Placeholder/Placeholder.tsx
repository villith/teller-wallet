import { StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IPlaceholderProps {
  imgSrc: string;
  title: string;
}

export interface IPlaceholderState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  placeholder: {
    opacity: 0.25,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    padding: theme.spacing.unit
  },
  placeholderImage: {
    height: '50%',
    width: '50%',
    margin: 'auto',
    padding: theme.spacing.unit * 2
  }
});

class Placeholder extends React.Component<WithStyles<any> & IPlaceholderProps, IPlaceholderState> {
  public render() {
    const { classes, imgSrc, title } = this.props;
    return (
      <div className={classes.placeholder}>
        <img src={imgSrc} className={classes.placeholderImage} />
        <Typography variant='headline'>{title}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Placeholder)