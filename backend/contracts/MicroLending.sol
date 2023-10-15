// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MicroLending {

    struct Lender {
        address payable lenderAddress;
        uint amountFunded;
    }

    struct Loan {
        address payable borrower;
        uint amountRequested;
        uint amountFunded;
       
        bool fundraisingEnded;
        bool isFunded;
        bool isRepaid;
        uint repaymentAmount;  // This will store principal + interest
        string description;
        Lender[] lenders;
         uint fundraisingDeadline;
    }

    Loan[] public loans;

    uint constant INTEREST_RATE = 5;  // Constant interest rate of 5%

    event LoanRequested(address borrower, uint amount, uint deadline, string description);
    event LoanFunded(address lender, uint loanId, uint amountFunded);
    event LoanSentToBorrower(uint loanId, uint amount);
    event LoanRepaid(uint loanId);

    function requestLoan(uint _amount, uint _durationInDays, string memory _description) public {
        Loan storage newLoan = loans.push();
        newLoan.borrower = payable(msg.sender);
        newLoan.amountRequested = _amount ;  // Convert ether to wei
        newLoan.fundraisingDeadline = block.timestamp + (_durationInDays * 1 days);
        newLoan.description = _description;
        newLoan.repaymentAmount = (newLoan.amountRequested * (100 + INTEREST_RATE)) / 100;
        emit LoanRequested(msg.sender, newLoan.amountRequested, newLoan.fundraisingDeadline, _description);
    }

    function viewRepaymentAmount(uint _loanId) public view returns (uint) {
        return loans[_loanId].repaymentAmount;
    }
    function fundLoan(uint _loanId) public payable {
        Loan storage loan = loans[_loanId];
        require(block.timestamp <= loan.fundraisingDeadline, "Fundraising for this loan has ended");
        require(loan.amountFunded + msg.value <= loan.amountRequested, "Exceeds the required loan amount");

        loan.lenders.push(Lender({
            lenderAddress: payable(msg.sender),
            amountFunded: msg.value
        }));

     
        loan.amountFunded += msg.value;

    if (loan.amountFunded == loan.amountRequested) {
        loan.isFunded = true;  // Update the isFunded flag when amountFunded matches amountRequested
    }

        emit LoanFunded(msg.sender, _loanId, msg.value);
    }

   function endFundraising(uint _loanId) public {
    Loan storage loan = loans[_loanId];
    require(msg.sender == loan.borrower, "Only the borrower can end the fundraising");
    // require(block.timestamp > loan.fundraisingDeadline, "Fundraising for this loan is still ongoing");
    require(!loan.isFunded, "Funds have already been sent to the borrower");
    // require(loan.amountFunded == loan.amountRequested, "The loan is not fully funded"); 
 loan.fundraisingEnded = true; 
    loan.borrower.transfer(loan.amountFunded);
    loan.isFunded = true;

    emit LoanSentToBorrower(_loanId, loan.amountFunded);
}
   function repayLoan(uint _loanId) public payable {
    Loan storage loan = loans[_loanId];
    require(msg.sender == loan.borrower, "Only the borrower can repay the loan");
    // require(loan.isFunded || loan.fundraisingEnded, "Loan is not funded yet or fundraising was not ended by the borrower");
    require(!loan.isRepaid, "Loan already repaid");
    require(msg.value == loan.repaymentAmount, "Incorrect repayment amount"); 

    uint principal = loan.amountRequested;
    uint totalRepay = loan.repaymentAmount;

    for (uint i = 0; i < loan.lenders.length; i++) {
        Lender storage lender = loan.lenders[i];
        uint lenderShare = lender.amountFunded * totalRepay / principal;
        lender.lenderAddress.transfer(lenderShare);
    }

    loan.isRepaid = true;

    emit LoanRepaid(_loanId);
}

function getLendersForLoan(uint _loanId) public view returns (Lender[] memory) {
    return loans[_loanId].lenders;
}
function getAllLoans() public view returns (Loan[] memory) {
    return loans;
}
}
