import Web3 from 'web3';

const getWeb3 = () => {
    return new Promise(async (resolve, reject) => {
     
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                
                await window.ethereum.enable();
                // Return the web3 instance
                resolve(web3);
            } catch (error) {
                reject(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use the Mist/MetaMask's provider.
            const web3 = window.web3;
            resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
            const provider = new Web3.providers.HttpProvider("http://localhost:7545");
            const web3 = new Web3(provider);
            resolve(web3);
        }
    });
}

export default getWeb3;
