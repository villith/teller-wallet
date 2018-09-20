import { CircularProgress, List, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import NewsFeedRow from './NewsFeedRow';

export interface ICryptoPanicProps {
  handleLoading: (loading: boolean) => void;
  loading: boolean;
}

export interface ICryptoPanicState {
  error: string;
  posts: ICryptoPanicPost[];
  filter: CryptoPanicFilter;
  isMounted: boolean;
}

export interface ICryptoPanicResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICryptoPanicPost[];
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

export type CryptoPanicFilter =
  'rising'
  | 'hot'
  | 'bullish'
  | 'bearish'
  | 'important'
  | 'saved'
  | 'lol';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'https://cryptopanic.com/api/';
const auth = `?auth_token=7d673691e38f7fc8655eadc8199fe8d5ed677037`

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    minHeight: '300px',
    display: 'flex'
  },
  loading: {
    margin: 'auto'
  }
});

class CryptoPanic extends React.Component<WithStyles<any> & ICryptoPanicProps, ICryptoPanicState> {
  public state = {
    error: '',
    posts: [] as ICryptoPanicPost[],
    filter: 'hot' as CryptoPanicFilter,
    isMounted: false
  }

  public componentDidMount() {
    this.setState({ isMounted: true });
    if (this.state.posts.length === 0) {
      this.getPosts(this.state.filter as CryptoPanicFilter);
    }
  }

  public componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  public getPosts = (filter: CryptoPanicFilter) => {
    const url = `${corsProxy}${baseURL}posts/${auth}&public&filter=${filter}`;
    const request = fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    request
      .then(result => {
        return result.json()
      })
      .then((response: ICryptoPanicResponse) => {
        const { results } = response;
        if (this.state.isMounted) {
          this.setState({ posts: results }, () => this.props.handleLoading(false));
        }
    });

    request.catch(e => {
      this.setState({ error: e });
      this.props.handleLoading(false);
    });
  }

  public render() {
    const { classes, loading } = this.props;
    const { error, posts } = this.state;
    return (
      loading ? (
        <CircularProgress className={classes.loading} size={48} />
      ) : (
        error.length > 0 ? (
          <div>{error}</div>
        ) : (
          <List>
            {posts.slice(0, 10).map((post: ICryptoPanicPost, index) => {
              return <NewsFeedRow
                key={index}
                post={post}
              />
            })}
          </List>
        )
      )
    );
  }
}

export default withStyles(styles)(CryptoPanic);
