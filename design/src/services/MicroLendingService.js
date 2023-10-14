import { Contract } from "@ethersproject/contracts";
import { ethers } from 'ethers';
import getProvider from "./getWeb3"; 
import ABI from "../contracts/abi";
import { MicroLendingAddress as contractAddress } from "../contracts/address";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
console.log(ABI);
const microLendingContract = new Contract(contractAddress, ABI, signer);

const MicroLendingService = {
  requestLoan: async (amount, durationInDays, description) => {
    console.log("REQUESTING LOAN!")
    const tx = await microLendingContract.requestLoan(amount, durationInDays, description);
    await tx.wait();
    return tx;
  },

  viewRepaymentAmount: async (loanId) => {
    return await microLendingContract.viewRepaymentAmount(loanId);
  },

  fundLoan: async (loanId, value) => {
    const tx = await microLendingContract.fundLoan(loanId, { value: value });
    await tx.wait();
    return tx;
  },

  endFundraising: async (loanId) => {
    const tx = await microLendingContract.endFundraising(loanId);
    await tx.wait();
    return tx;
  },

  repayLoan: async (loanId, value) => {
    const tx = await microLendingContract.repayLoan(loanId, { value: value });
    await tx.wait();
    return tx;
  },

  getLendersForLoan: async (loanId) => {
    return await microLendingContract.getLendersForLoan(loanId);
  },
  getAllLoans: async () => {
    try {
        console.log("Fetching all loans...");
        const loans = await microLendingContract.getAllLoans();
        console.log("Received loans:", loans);
        return loans;
    } catch (error) {
        if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
            console.error("Failed to call contract:", error.reason || error.message);
        } else {
            console.error("Error fetching all loans:", error);
        }
        throw error; 
    }
}






};

export default MicroLendingService;
