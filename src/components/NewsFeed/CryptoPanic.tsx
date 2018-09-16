import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import NewsFeedRow from './NewsFeedRow';

export interface ICryptoPanicProps {
  handleLoading: (loading: boolean) => void;
}

export interface ICryptoPanicState {
  error: string;
  posts: ICryptoPanicPost[];
  filter: Filter;
}

export interface ICryptoPanicPost {
  kind: string;
  domain: string;
  votes: {
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
  },
  source: {
    domain: string;
    title: string;
    region: string;
    path: string | null;
  },
  title: string;
  published_at: string;
  slug: string;
  currencies: Array<{
    code: string;
    title: string;
    slug: string;
    url: string;
  }>;
  id: number;
  created_at: string;
  url: string;
}

type Filter =
  'rising'
  | 'hot'
  | 'bullish'
  | 'bearish'
  | 'important'
  | 'saved'
  | 'lol';

const baseURL = 'https://cryptopanic.com/api/';
const auth = `?7d673691e38f7fc8655eadc8199fe8d5ed677037`

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
});

class CryptoPanic extends React.Component<WithStyles<any> & ICryptoPanicProps, ICryptoPanicState> {
  public state = {
    error: '',
    posts: [] as ICryptoPanicPost[],
    filter: 'hot' as Filter
  }

  public componentDidMount() {
    this.getPosts(this.state.filter as Filter);
  }

  public getPosts = (filter: Filter) => {
    const url = `${baseURL}posts/${auth}&public&filter=${filter}`;
    const request = fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    request
      .then(result => result.json())
      .then((posts: ICryptoPanicPost[]) => {
        this.setState({ posts }, () => this.props.handleLoading(false));
    });

    request.catch(e => {
      this.setState({ error: e });
      this.props.handleLoading(false);
    });
  }

  public render() {
    const { classes } = this.props;
    const { error, posts } = this.state;
    return (
      <Paper className={classes.root}>
        {error.length > 0 ? (
          <div>{error}</div>
        ) : (
          posts.map((post: ICryptoPanicPost, index) => {
            return <NewsFeedRow
              key={index}
              post={post}
            />
          })
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(CryptoPanic);