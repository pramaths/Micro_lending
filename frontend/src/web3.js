import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('No Metamask found. You might consider installing it!');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export default web3;
