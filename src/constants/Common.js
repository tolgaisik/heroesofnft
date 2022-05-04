export const NUMBEROFTOKENS = 198;
export const ABI = [
	`function tokenURI(uint256 _tokenId) public view returns (string memory)`,
];
export const CONTRACTADDRESS = "0x9e3F28C3c37ac77684730e223aa7c0621a206CD6";
export const RPCURL = "https://api.avax-test.network:443/ext/bc/C/rpc";
export const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
