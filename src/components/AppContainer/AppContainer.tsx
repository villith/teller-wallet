import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import App from '../App/App';

class AppContainer extends React.Component<RouteComponentProps<any>> {
  public render() {
    const { match, location, history } = this.props;
    return (
      <App
        match={match}
        location={location}
        history={history}
      />
    );
  }
}

export default withRouter(AppContainer);