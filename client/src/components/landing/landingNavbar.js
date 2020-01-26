import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";
import SessionMaster from "../session/sessionMaster";
import "../landing/landing.css"

const LandingNavbar = props => {
  return (
    <div className="LandingNavMainCont">
      <div className="LandingNavCont">
        <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data }) => {
                if (data.isLoggedIn) {
                  return (
                    <button
                      className="langingNavButton"
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        props.history.push("/login");
                      }}
                    >
                      Logout
                    </button>
                  );
                } else {
                  return (
                    <div>
                      {/* <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link> */}
                      <Route path="/login" component={SessionMaster} />
                    </div>
                  );
                }
              }}
            </Query>
          )}
        </ApolloConsumer>
      </div>
    </div>
  );
};
export default withRouter(LandingNavbar);
