import React, { useEffect, useState } from 'react';
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const Lender = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [connected, setConnected] = useState(false);

    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // const provider = new ethers.providers.Web3Provider(window.ethereum);
                const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
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

    const loadLoanRequests = async () => {
        try {
            console.log("pramath")
            const loanRequestsData = await MicroLendingService.getAllLoans();
            console.log("====>", { loanRequestsData })
            setLoanRequests(loanRequestsData);
            console.log("helllo")
        } catch (error) {
            console.error('Error loading loan requests:', error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await connectToMetaMask();
            setConnected(true);
            await loadLoanRequests();
        };
        initialize();
    }, []);

    return (
        <div>
            <h1>Lender Page</h1>
            {!connected ? (
                <p>Waiting for MetaMask connection...</p>
            ) : (
                <>
                    <h2>Loan Requests:</h2>
                    <ul>
                        {loanRequests.map((loan, index) => (
                            <li key={index}>
                                <div>
                                    <strong>Borrower: {loan[0]}</strong>
                                    <p>Amount Requested: {ethers.utils.formatEther(loan[1])}</p>
<p>Amount Funded: {ethers.utils.formatEther(loan[2])}</p>
<p>Fundraising Deadline: {loan[3].toString()}</p>                                    <p>Is Funded: {loan[4] ? 'Yes' : 'No'}</p>
                                    <p>Is Repaid: {loan[5] ? 'Yes' : 'No'}</p>
                                    <p>Repayment Amount: {ethers.utils.formatEther(loan[6])}</p>
                                    <p>Description: {loan[7]}</p>
                                    <p>Lenders:</p>
                                    <ul>
                                        {loan[8].map((lender, lenderIndex) => (
                                            <li key={lenderIndex}>
                                                <strong>Lender Address: {lender[0]}</strong>
                                                <p>Amount Funded: {lender[1]}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Lender;
