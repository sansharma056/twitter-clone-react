import React, { useContext } from "react";
import { Router, Link, useLocation, Redirect } from "@reach/router";
import UserHome from "./UserHome";
import Nav from "./Nav";
import WhoToFollow from "./WhoToFollow";
import { TwitterLogo } from "./Icons";
import Explore from "./Explore";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";
import SearchInput from "./SearchInput";
import useInput from "./useInput";
import { AuthContext } from "./AuthContext";

const MainScreen = () => {
	const authState = useContext(AuthContext);
	const searchInput = useInput("");
	const { pathname } = useLocation();

	return authState.isAuthenticated ? (
		<div className="main-screen">
			<div className="sidebar">
				<div className="sidebar-header-wrapper">
					<div className="sidebar-header">
						<Link className="btn btn--icon" to="home">
							<TwitterLogo />
						</Link>
						<Nav />
					</div>
				</div>
			</div>
			<div className="main-screen-content">
				<div>
					<Router className="main-screen-router">
						<UserHome path="home" />
						<Explore path="explore" />
						<Explore path="explore/:q" />
						<Bookmarks path="bookmarks" />
						<Profile path=":screenName" />
					</Router>
					<div className="sidebar-right">
						{pathname != "/explore" ? (
							<SearchInput
								onChange={searchInput.onChange}
								value={searchInput.state}
							/>
						) : null}
						<WhoToFollow
							users={[
								{ id: 1, avatarURL: "", name: "Test Test", handle: "test" },
								{ id: 2, avatarURL: "", name: "Test1 Test", handle: "test1" },
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Redirect to="login" noThrow />
	);
};

export default MainScreen;
