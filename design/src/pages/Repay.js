// import React, { useState, useEffect } from 'react';
// import { ethers } from "ethers";
// import MicroLendingService from '../services/MicroLendingService';

// const RepayComponent = () => {
//     const [loans, setLoans] = useState([]);
//     const [loanIndices, setLoanIndices] = useState([]); // Special variable to store indices of the loans

//     const handleRepay = async (loanId, owedAmount) => {
//         try {
//             if (typeof window.ethereum !== 'undefined') {
//                 const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 if (accounts && accounts.length > 0) {
//                     await MicroLendingService.repayLoan(loanId, owedAmount);
//                     console.log(`Successfully repaid loan ${loanId}`);

//                     // Reload loans to reflect changes
//                     const provider = new ethers.providers.Web3Provider(window.ethereum);
//                     const address = await provider.getSigner().getAddress();
//                     const allLoans = await MicroLendingService.getAllLoans();
//                     const filteredLoans = allLoans.filter((loan, idx) => {
//                         if (loan.borrower.toLowerCase() === address.toLowerCase() &&
//                             (loan.isFunded || loan.fundraisingEnded)) {
//                                 setLoanIndices(prevIndices => [...prevIndices, idx]);
//                                 return true;
//                         }
//                         return false;
//                     });
//                     setLoans(filteredLoans);
//                 } else {
//                     console.error("No accounts found. Make sure you're logged into MetaMask.");
//                 }
//             } else {
//                 console.error("MetaMask not detected!");
//             }
//         } catch (error) {
//             console.error(`Error repaying loan ${loanId}:`, error);
//         }
//     };

//     useEffect(() => {
//         const fetchLoans = async () => {
//             try {
//                 const allLoans = await MicroLendingService.getAllLoans();
//                 const address = window.ethereum.selectedAddress; // Assume MetaMask is available
//                 const filteredLoans = allLoans.filter((loan, idx) => {
//                     if (loan.borrower.toLowerCase() === address.toLowerCase() &&
//                         (loan.isFunded || loan.fundraisingEnded)) {
//                             setLoanIndices(prevIndices => [...prevIndices, idx]); 
//                             return true;
//                     }
//                     return false;
//                 });
//                 setLoans(filteredLoans);
//             } catch (error) {
//                 console.error("Error fetching loans:", error.message);
//             }
//         };
//         fetchLoans();
//     }, []);

//     return (
//         <div>
//             <h1>Repay Your Loans</h1>
//             {loans.length > 0 ? (
//                 loans.map((loan, index) => (
//                     <div key={loanIndices[index]}>
//                         <strong>Loan ID: {loanIndices[index]}</strong>
//                         <p>Amount Owed: {ethers.utils.formatEther(loan.repaymentAmount)}</p>
//                         <button onClick={() => handleRepay(loanIndices[index], loan.repaymentAmount)}>Repay Loan</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>You have no loans to repay.</p>
//             )}
//         </div>
//     );
// };

// export default RepayComponent;
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import MicroLendingService from '../services/MicroLendingService';

const RepayComponent = () => {
    const [loans, setLoans] = useState([]);
    const [loanIndices, setLoanIndices] = useState([]); // Special variable to store indices of the loans

    const handleRepay = async (loanId, owedAmount) => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    await MicroLendingService.repayLoan(loanId, owedAmount);
                    console.log(`Successfully repaid loan ${loanId}`);

                    // Reload loans to reflect changes
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const address = await provider.getSigner().getAddress();
                    const allLoans = await MicroLendingService.getAllLoans();
                    const filteredLoans = allLoans.filter((loan, idx) => {
                        if (loan.borrower.toLowerCase() === address.toLowerCase() &&
                            (loan.isFunded || loan.fundraisingEnded) &&
                            !loan.isRepaid) { // Check that the loan hasn't been repaid
                                setLoanIndices(prevIndices => [...prevIndices, idx]);
                                return true;
                        }
                        return false;
                    });
                    setLoans(filteredLoans);
                } else {
                    console.error("No accounts found. Make sure you're logged into MetaMask.");
                }
            } else {
                console.error("MetaMask not detected!");
            }
        } catch (error) {
            console.error(`Error repaying loan ${loanId}:`, error);
        }
    };

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const allLoans = await MicroLendingService.getAllLoans();
                const address = window.ethereum.selectedAddress; // Assume MetaMask is available
                const filteredLoans = allLoans.filter((loan, idx) => {
                    if (loan.borrower.toLowerCase() === address.toLowerCase() &&
                        (loan.isFunded || loan.fundraisingEnded) &&
                        !loan.isRepaid) { // Check that the loan hasn't been repaid
                            setLoanIndices(prevIndices => [...prevIndices, idx]);
                            return true;
                    }
                    return false;
                });
                setLoans(filteredLoans);
            } catch (error) {
                console.error("Error fetching loans:", error.message);
            }
        };
        fetchLoans();
    }, []);

    return (
        <div>
            <h1>Repay Your Loans</h1>
            {loans.length > 0 ? (
                loans.map((loan, index) => (
                    <div key={loanIndices[index]}>
                        <strong>Loan ID: {loanIndices[index]}</strong>
                        <p>Amount Owed: {ethers.utils.formatEther(loan.repaymentAmount)}</p>
                        <button onClick={() => handleRepay(loanIndices[index], loan.repaymentAmount)}>Repay Loan</button>
                    </div>
                ))
            ) : (
                <p>You have no loans to repay.</p>
            )}
        </div>
    );
};

export default RepayComponent;
