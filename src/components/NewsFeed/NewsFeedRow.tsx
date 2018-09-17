import { Divider, ListItem, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Aux } from '../winAux';
import { ICryptoPanicPost } from './CryptoPanic';

export interface INewsFeedRowProps {
  post: ICryptoPanicPost;
}

export interface INewsFeedRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  listItem: {
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: 'rgba(194, 219, 255, 0.8) !important',
      color: 'rgba(0, 0, 0, 0.95) !important'
    }
  },
  listItemLink: {
    textDecoration: 'none !important',    
  }
});

class NewsFeedRow extends React.Component<WithStyles<any> & INewsFeedRowProps, INewsFeedRowState> {
  public render() {
    const { classes, post } = this.props;
    return (
      <Aux>
        <ListItem
          button={true}
          component='a'
          href={post.url}
          className={classes.listItem}
          target='_blank'
        >
          <div className={classes.listItemHeader}>
            <Typography variant='caption'>{post.title}</Typography>
          </div>
        </ListItem>
        <Divider />
      </Aux>
    );
  }
}

export default withStyles(styles)(NewsFeedRow);
