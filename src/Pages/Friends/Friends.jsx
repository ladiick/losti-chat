import React, {useState} from 'react';
import Home from "../../components/Home/Home";
import AllPeople from "../../components/AllPeople/AllPeople";
import Modul from "../../components/Modul/Modul";
import {useSelector} from "react-redux";

const Friends = () => {
	return (
		<>
			<Home>
				<AllPeople/>
					<Modul/>
			</Home>
		</>
	);
};

export default Friends;
