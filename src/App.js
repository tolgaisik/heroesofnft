import heroes from "./constants/HeroesToken.json";
import * as ethers from "ethers";
import { useEffect } from "react";
const privkey =
	"92b83c229ec9fd75fce980bd9c81ca48d9e83ecf1774801b679bf8b66ed350ea";
//const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Connect to the network

// Prompt user for account connections
async function connectAccount() {
	const provider = new ethers.providers.Web3Provider(
		window.ethereum,
		"any"
	);
	provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(
		"0x9e3F28C3c37ac77684730e223aa7c0621a206CD6",
		heroes,
		signer
	);
	console.log(typeof heroes);
	/* "0x9e3F28C3c37ac77684730e223aa7c0621a206CD6",
		heroes,
		provider */

	contract.functions
		.tokenURI()
		.then(console.log)
		.catch((err) => console.log(err));
}
connectAccount();
/* const wallet = new ethers.Wallet(privkey, provider);
const signer = wallet.provider.getSigner();
const contract = new ethers.Contract(
	"0x9e3F28C3c37ac77684730e223aa7c0621a206CD6",
	heroes,
	signer
); // 92b83c229ec9fd75fce980bd9c81ca48d9e83ecf1774801b679bf8b66ed350ea
console.log(contract.tokenURI(1).then(console.log)); */
function App() {
	return <div className="App"></div>;
}

export default App;
