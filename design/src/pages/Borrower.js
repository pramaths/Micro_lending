import React, { useState } from 'react';
import MicroLendingService from '../services/MicroLendingService';
import './borrower.css'
function Borrower() {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [loanId, setLoanId] = useState('');

    const handleRequestLoan = async () => {
        try {
            const tx = await MicroLendingService.requestLoan(amount, duration, description);
            console.log('Loan requested:', tx);
        } catch (error) {
            console.error('Error requesting loan:', error);
        }
    };

    const handleViewRepaymentAmount = async () => {
        try {
            const repaymentAmount = await MicroLendingService.viewRepaymentAmount(loanId);
            console.log('Repayment amount:', repaymentAmount.toString());
        } catch (error) {
            console.error('Error fetching repayment amount:', error);
        }
    };

    // ... Add similar methods for endFundraising and repayLoan ...

    return (
        <div>
            <div className='containerborrower'>
                <h3>Request Loan</h3>
                <input 
                    type="text" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount" 
                />
                <input 
                    type="text" 
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="Duration (in days)" 
                />
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
                <button onClick={handleRequestLoan}>Request Loan</button>
            </div>

            <div className='payment'>
                <h3>View Repayment Amount</h3>
                <input 
                    type="text" 
                    value={loanId}
                    onChange={e => setLoanId(e.target.value)}
                    placeholder="Loan ID" 
                />
                <button onClick={handleViewRepaymentAmount}>View Repayment Amount</button>
            </div>

            {/* Add similar UI elements for endFundraising and repayLoan ... */}

        </div>
    );
}

export default Borrower;
