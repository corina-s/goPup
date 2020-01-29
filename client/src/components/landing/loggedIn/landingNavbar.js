import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from "../../graphql/queries";
import SessionMaster from "../../session/sessionMaster";

const LandingNavbar = props => {
  console.log(localStorage)
  return (
    <div className="LandingNavMainCont">
      <div className="LandingNavCont">
        <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data }) => {
                if (data.isLoggedIn) {
                  console.log(props)
                  return (
                    <div id="landingNavbarContainer">
                      <div id="landingNavbarLeftContainer">
                        <div id="logoFont">goPüp</div>
                        <div id="landingNavbarSearch">
                          <Link
                            style={{ "textDecoration": "none" }}
                            to="/routes/explore"
                          >
                            <i id="searchIcon" className="fas fa-search"></i>
                          </Link>
                        </div>
                        <div
                          id="landingNavbarMenuDashboard"
                          className="landingNavbarMenu landingNavbarSelected"
                        >
                          Routes
                          <div
                            id="landingBarDashboardDrop"
                            className="landingBarDrop"
                          >
                            <div id="mask"></div>
                            <Link
                              style={{ "textDecoration": "none" }}
                              to="/routes/new"
                            >
                              <div className="dropItem">Create</div>
                            </Link>
                            <Link
                              style={{ "textDecoration": "none" }}
                              to="/routes/explore"
                            >
                              <div className="dropItem">Explore</div>
                            </Link>
                            <Link
                              style={{ "textDecoration": "none" }}
                              to="/routes/stats"
                            >
                              <div className="dropItem">Stats</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div id="landingNavbarLeftContainer">
                        <div
                          id="landingNavbarMenuUser"
                          className="landingNavbarMenu"
                        >
                          <i className="far fa-user-circle"></i>
                          <div
                            id="landingBarUserDrop"
                            className="landingBarDrop"
                          >
                            <div id="userDropMask"></div>
                            {/* <div className="dropItem">Profile</div>
                            <div className="dropItem">Settings</div> */}
                            <div
                              className="dropItem"
                              id="sessionLogoutButton"
                              onClick={e => {
                                e.preventDefault();
                                localStorage.removeItem("auth-token");
                                client.writeData({
                                  data: { isLoggedIn: false }
                                });
                                props.history.push("/login");
                              }}
                            >
                              Logout
                            </div>
                          </div>
                        </div>
                        <Link
                          style={{ "textDecoration": "none" }}
                          to="/routes/new"
                        >
                          <div
                            id="landingNavbarMenuRoute"
                            className="landingNavbarMenu"
                          >
                            <i className="far fa-plus-square"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
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
