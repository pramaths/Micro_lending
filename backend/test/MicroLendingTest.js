const MicroLending = artifacts.require("MicroLending");

contract("MicroLending", accounts => {

    it("should allow a borrower to request a loan", async () => {
        const microLending = await MicroLending.deployed();

        const amount = web3.utils.toWei("1", "ether"); // 1 Ether
        const durationInDays = 10;
        const description = "Need loan for medical expenses";

        await microLending.requestLoan(amount, durationInDays, description, { from: accounts[0] });

        const loan = await microLending.loans(0);
        assert.equal(loan.borrower, accounts[0]);
        assert.equal(loan.amountRequested.toString(), amount);
        assert.equal(loan.description, description);
    });

    it("should allow users to fund a loan", async () => {
        const microLending = await MicroLending.deployed();

        const fundingAmount = web3.utils.toWei("1", "ether"); // 0.5 Ether
        await microLending.fundLoan(0, { from: accounts[1], value: fundingAmount });

        const loan = await microLending.loans(0);
        assert.equal(loan.amountFunded.toString(), fundingAmount);
    });

    it("should allow the borrower to end fundraising and collect funds", async () => {
        const microLending = await MicroLending.deployed();

        await microLending.endFundraising(0, { from: accounts[0] });

        const loan = await microLending.loans(0);
        assert.equal(loan.isFunded, true);
    });

    it("should allow the borrower to repay the loan", async () => {
        const microLending = await MicroLending.deployed();

        const repaymentAmount = await microLending.viewRepaymentAmount(0);
        await microLending.repayLoan(0, { from: accounts[0], value: repaymentAmount.toString() });

        const loan = await microLending.loans(0);
        assert.equal(loan.isRepaid, true);
    });

    it("should retrieve lenders for a specific loan", async () => {
        const microLending = await MicroLending.deployed();
    
        const lenders = await microLending.getLendersForLoan(0);
    
        assert.equal(lenders[0].lenderAddress, accounts[1]);
        assert.equal(lenders[0].amountFunded.toString(), web3.utils.toWei("1", "ether"));
    });
    it("should retrieve all loans", async () => {
        const microLending = await MicroLending.deployed();
    
        const allLoans = await microLending.getAllLoans();
    
        assert.equal(allLoans[0].borrower, accounts[0]);
        assert.equal(allLoans[0].amountRequested.toString(), web3.utils.toWei("1", "ether"));
        assert.equal(allLoans[0].description, "Need loan for medical expenses");
    });
   

});

