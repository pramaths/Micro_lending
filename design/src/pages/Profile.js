import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';

const Profile = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [connected, setConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');

    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const address = await provider.getSigner().getAddress();
                setCurrentAddress(address);
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
            console.log("hello pramath ")
            const loanRequestsData = await MicroLendingService.getAllLoans();
            const filteredLoans = loanRequestsData.filter(loan => loan[0] === currentAddress);
            setLoanRequests(filteredLoans);
        } catch (error) {
            console.error('Error loading loan requests:', error);
        }
    };

    const handleEndFundraising = async (index) => {
        try {
            await MicroLendingService.endFundraising(index);
            console.log(`Successfully ended fundraising for loan ${index}`);
            await loadLoanRequests();
        } catch (error) {
            console.error(`Error ending fundraising for loan ${index}:`, error);
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
            <h1>My Profile</h1>
            {!connected ? (
                <p>Waiting for MetaMask connection...</p>
            ) : (
                <>
                    <h2>Your Loan Requests:</h2>
                    <ul>
                        {loanRequests.map((loan, index) => (
                            <li key={index}>
                                <div>
                                    <strong>Borrower: {loan[0]}</strong>
                                    <p>Amount Requested: {ethers.utils.formatEther(loan[1])}</p>
                                    <p>Fundraising Deadline: {loan[3].toString()}</p>
                                    <p>Is Funded: {loan[4] ? 'Yes' : 'No'}</p>
                                    <p>Is Repaid: {loan[5] ? 'Yes' : 'No'}</p>
                                    <p>Description: {loan[7]}</p>
                                    <button onClick={() => handleEndFundraising(index)}>End Fundraising</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Profile;
