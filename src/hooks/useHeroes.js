import { useEffect, useState } from "react";
import * as ethers from "ethers";
import {
	RPCURL,
	CONTRACTADDRESS,
	ABI,
	NUMBEROFTOKENS,
} from "../constants/Common";
async function getHeroes() {
	const provider = new ethers.providers.JsonRpcProvider({
		url: RPCURL,
	});
	const contract = new ethers.Contract(CONTRACTADDRESS, ABI, provider);
	const tokens = await Promise.all(
		[...Array(NUMBEROFTOKENS).keys()].map((i) => {
			return contract.tokenURI(i);
		})
	);
	const fetchedHeroes = await Promise.all(
		tokens.map(async (token) => {
			return fetch(token).then((res) => res.json());
		})
	);
	return fetchedHeroes;
}
export default function useHeroes() {
	const [heroes, setHeroes] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		connect();
	}, []);
	async function connect() {
		try {
			const localHeroes = JSON.parse(
				localStorage.getItem("heroes") ?? "[]"
			);
			if (localHeroes.length > 0) {
				setHeroes(localHeroes);
			} else {
				const fetchedH = await getHeroes();
				localStorage.setItem(
					"heroes",
					JSON.stringify(fetchedH)
				);
				setHeroes(fetchedH);
			}
			setIsLoading(false);
		} catch (error) {
			setError(error);
		}
	}
	return [heroes, isLoading, error];
}
