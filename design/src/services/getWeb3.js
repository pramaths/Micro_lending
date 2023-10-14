import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

const connectToMetaMask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected to MetaMask account:", address);

      return provider;
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("MetaMask not detected!");
  }
};

const logSignerAddress = async () => {
  const ethereumProvider = await connectToMetaMask();
  if (ethereumProvider) {
    const signer = ethereumProvider.getSigner();
    const address = await signer.getAddress();
    console.log("Connected to MetaMask account:", address);
  }
};
connectToMetaMask()
logSignerAddress();

const getProvider = () => {
  return new JsonRpcProvider("http://127.0.0.1:7545");
};


export default getProvider;
