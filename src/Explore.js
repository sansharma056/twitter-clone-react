import React, { useContext, useEffect, useState } from "react";
import useInput from "./useInput";
import SearchInput from "./SearchInput";
import UserCardFull from "./UserCardFull";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const Explore = ({ q }) => {
	const authState = useContext(AuthContext);
	const [result, setResult] = useState({ users: [], tweets: [] });
	const searchInput = useInput(q ? q : "");

	useEffect(() => {
		document.title = "Explore / Twitter Clone";

		if (searchInput.state.length > 0) {
			axios({
				method: "GET",
				url: `${process.env.API_URL}/user/search/${searchInput.state}`,
				headers: { authorization: authState.token },
			}).then((response) => {
				if (response.status == 200) {
					setResult({...result, users: response.data.users });
				}
			});
		} else {
			setResult({users: [], tweets: []});
		}
	}, [searchInput.state]);

	return (
		<div className="explore">
			<div className="explore-header">
				<SearchInput
					onChange={searchInput.onChange}
					value={searchInput.state}
				/>
			</div>
			<div className="explore-content">
				{result.users.length > 0 ? (
					<div className="explore-search-result">
						{result.users.map((user) => (
							<UserCardFull key={user.handle} user={user} />
						))}
					</div>
				) : (
					<div className="explore-search-result-alt">
						<h2>Try searching for people, topics, or keywords</h2>
						<p>Your search result will appear here.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Explore;
