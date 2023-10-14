import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';

const RepayComponent = () => {
    const [loans, setLoans] = useState([]);
    const [repayAmounts, setRepayAmounts] = useState({});
    const [connected, setConnected] = useState(false);
    const [provider, setProvider] = useState(null);

    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask detected, trying to connect...');
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    console.log('Connected to account:', accounts[0]);
                    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
                    setProvider(newProvider);
                    setConnected(true);
                } else {
                    setConnected(false);
                    console.error("No accounts found. Make sure you're logged into MetaMask.");
                }
            } catch (error) {
                setConnected(false);
                console.error("Error connecting to MetaMask:", error.message);
            }
        } else {
            setConnected(false);
            console.log('MetaMask not detected');
        }
    };

    const handleRepayAmountChange = (index, event) => {
        const updatedAmounts = { ...repayAmounts, [index]: event.target.value };
        setRepayAmounts(updatedAmounts);
    };

    const handleRepay = async (loanId, index) => {
        const amountInWei = ethers.utils.parseEther(repayAmounts[index] || '0');
        try {
            await MicroLendingService.repayLoan(loanId, amountInWei);
            console.log(`Successfully repaid loan ${loanId}`);
            if (provider) {
                const address = await provider.getSigner().getAddress();
                const loansByBorrower = await MicroLendingService.getLoansByBorrower(address);
                setLoans(loansByBorrower);
            }
        } catch (error) {
            console.error(`Error repaying loan ${loanId}:`, error);
        }
    };

    useEffect(() => {
        // Connect to MetaMask immediately on component mount
        connectToMetaMask();
        
        if (connected && provider) {
            const fetchLoans = async () => {
                try {
                    console.log('Fetching loans...');
                    const address = await provider.getSigner().getAddress();
                    const loansByBorrower = await MicroLendingService.getLoansByBorrower(address);
                    console.log('Loans fetched:', loansByBorrower);
                    setLoans(loansByBorrower);
                } catch (error) {
                    console.error("Error fetching loans:", error.message);
                }
            };
            fetchLoans();
        }
    }, [connected, provider]);

    return (
        <div>
            <h1>Repay Your Loans</h1>
            {!connected ? (
                <div>
                    <p>Waiting for MetaMask connection...</p>
                    <button onClick={connectToMetaMask}>Connect to MetaMask</button>
                </div>
            ) : loans.length > 0 ? (
                loans.map((loan, index) => (
                    <div key={index}>
                        <strong>Loan ID: {loan.id}</strong>
                        <p>Amount Owed: {ethers.utils.formatEther(loan.amount)}</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Amount to repay in ETH"
                                value={repayAmounts[index] || ''}
                                onChange={(e) => handleRepayAmountChange(index, e)}
                            />
                            <button onClick={() => handleRepay(loan.id, index)}>Repay Loan</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have no loans to repay.</p>
            )}
        </div>
    );
};

export default RepayComponent;
