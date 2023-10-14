import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';
import TruffleContract from '@truffle/contract';
import { MicroLendingABI, MicroLendingAddress } from '../contracts/MicroLending';

function BorrowForm() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();
                const contractInstance = TruffleContract({
                    abi: MicroLendingABI,
                    address: MicroLendingAddress,
                });
                contractInstance.setProvider(web3.currentProvider);
                setWeb3(web3);
                setAccount(accounts[0]);
                setContract(contractInstance);
            } catch (error) {
                console.error("Failed to load web3, accounts, or contract:", error);
            }
        };

        initWeb3();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contract || !web3) {
            console.error("Web3 or contract isn't set");
            return;
        }

        try {
            const instance = await contract.deployed();
            await instance.requestLoan(amount, { from: account });
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount to Borrow" />
            <button type="submit">Borrow</button>
        </form>
    );
}

export default BorrowForm;
