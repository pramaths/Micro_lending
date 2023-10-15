import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';
import './lender.css';
const Lender = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [connected, setConnected] = useState(false);
    const [amountsToFund, setAmountsToFund] = useState({});

    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Use Web3Provider here
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                return provider;
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("MetaMask not detected!");
        }
    };

    const handleAmountChange = (index, event) => {
        const updatedAmounts = { ...amountsToFund, [index]: event.target.value };
        setAmountsToFund(updatedAmounts);
    };

    const handleFundLoan = async (index) => {
        const amountInWei = ethers.utils.parseEther(amountsToFund[index] || '0');
        try {
            await MicroLendingService.fundLoan(index, amountInWei);
            console.log(`Successfully funded loan ${index}`);
            // Optionally reload the loan requests to reflect the changes
            await loadLoanRequests();
        } catch (error) {
            console.error(`Error funding loan ${index}:`, error);
        }
    };

    const loadLoanRequests = async () => {
        try {
            const loanRequestsData = await MicroLendingService.getAllLoans();
            setLoanRequests(loanRequestsData);
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
        <div  className='lenderbox'>
            {!connected ? (
                <p>Waiting for MetaMask connection...</p>
            ) : (
                <>
                    <h2>Loan Requests:</h2>
                    <div className='loans'>
                    <ul>
                        {loanRequests.map((loan, index) => (
                            <li key={index}>
                                <div>
                                
                                    <strong>{index + 1}.{""}Borrower: {loan[0]}</strong>
                                    <p>Amount Requested: {ethers.utils.formatEther(loan[1])}{""} ETH</p>
                                    <p>Amount Funded: {ethers.utils.formatEther(loan[2])} {" "} ETH</p>
                                    <p>Fundraising Deadline: {loan[3].toString()}</p>
                                    <div className='attributes'>
                                    <div className='p1'>Is Funded: {loan[4] ? 'Yes' : 'No'}</div>
                                    <div>Is Repaid: {loan[5] ? 'Yes' : 'No'}</div></div>
                                    <p>Repayment Amount: {ethers.utils.formatEther(loan[6])} {""} ETH</p>
                                    <p>Description: {loan[7]}</p>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Amount to fund in ETH"
                                            value={amountsToFund[index] || ''}
                                            onChange={(e) => handleAmountChange(index, e)}
                                        />
                                        <button onClick={() => handleFundLoan(index)}>Fund Loan</button>
                                    </div>
                                    <p>Lenders:</p>
                                    <ul>
                                        {loan[8].map((lender, lenderIndex) => (
                                            <li key={lenderIndex}>
                                                <strong>Lender Address: {String(lender[0])}</strong> {/* Ensure Lender address is a string */}
                                                <p>Amount Funded: {ethers.utils.formatEther(lender[1] || '0')}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Lender;
