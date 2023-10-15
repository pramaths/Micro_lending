import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';

const ETHERSCAN_API_KEY = 'YourEtherscanAPIKey'; // Replace with your Etherscan API key

const Profile = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [connected, setConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [creditScore, setCreditScore] = useState('');

    const connectToMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const address = await provider.getSigner().getAddress();
                setCurrentAddress(address);
                setConnected(true);
                await loadLoanRequests(address);
                fetchCreditScore(address);
                return provider;
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("MetaMask not detected!");
        }
    };

    const fetchCreditScore = async (address) => {
        try {
            const response = await fetch(
                `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`
            );

            const data = await response.json();
            const txCount = data.result.length;

            if (txCount > 10) {
                setCreditScore('High');
            } else if (txCount <= 10 && txCount > 5) {
                setCreditScore('Medium');
            } else {
                setCreditScore('Low');
            }
        } catch (error) {
            console.error('Failed to fetch credit score:', error);
        }
    };
    const loadLoanRequests = async (address) => {
        try {
            const loanRequestsData = await MicroLendingService.getAllLoans();
            const filteredLoans = loanRequestsData
                .map((loan, idx) => ({ loanId: idx, loanDetails: loan }))
                .filter(loanObj => loanObj.loanDetails[0] === address);
    
            filteredLoans.forEach(loanObj => {
                console.log(`Loan Index: ${loanObj.loanId}`);
                console.log('Loan Details:', loanObj.loanDetails);
            });
    
            setLoanRequests(filteredLoans);
            console.log(filteredLoans)
        } catch (error) {
            console.error('Error loading loan requests:', error);
        }
    };

    const handleEndFundraising = async (loanId) => {
        try {
            await MicroLendingService.endFundraising(loanId);
            await loadLoanRequests(currentAddress);
        } catch (error) {
            console.error(`Error ending fundraising for loan ${loanId}:`, error);
        }
    };

    useEffect(() => {
        connectToMetaMask();
    }, []);

    return (
        <div>
            <h1>My Profile</h1>
            {!connected ? (
                <p>Waiting for MetaMask connection...</p>
            ) : (
                <>
                    <h2>Your Loan Requests:</h2>
                    <p>Credit Score: {creditScore}</p>
                    <ul>
        {loanRequests.map(({ loanId, loanDetails }) => (
            <li key={loanId}>
                <div>
                    <strong>Borrower: {loanDetails[0]}</strong>
                    <p>Amount Requested: {ethers.utils.formatEther(loanDetails[1])} ETH</p>
                    <p>Amount Funded: {ethers.utils.formatEther(loanDetails[2])} ETH</p>
                    <p>Fundraising Deadline: {loanDetails[3].toString()}</p>
                    <p>Is Funded: {loanDetails[4] ? 'Yes' : 'No'}</p>
                    <p>Is Repaid: {loanDetails[5] ? 'Yes' : 'No'}</p>
                    <p>Description: {loanDetails[7]}</p>
                    <button onClick={() => handleEndFundraising(loanId)}>End Fundraising</button>
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
