const { expect } = require("chai");
const hre = require("hardhat");

describe("ToxxicToken contract", function() {
    let Token;
    let ToxxicToken;
    let owner;
    let addr1;
    let addr2;
    let tokenCap = 20000000;
    let tokenBlockReward = 25;

    beforeEach(async function() {
        // Get the contract factory and signers here
        Token = await ethers.getContractFactory("ToxxicToken");
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        ToxxicToken = await Token.deploy(tokenCap, tokenBlockReward);
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            expect(await ToxxicToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function() {
            const ownerBalance = await ToxxicToken.balanceOf(owner.address);
            expect(await ToxxicToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Should set the max capped supply to the argument provided during deployment", async function() {
            const cap = await ToxxicToken.cap();
            expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
        });

        it("Should set the blockReward to the argument provided during deployment", async function() {
            const blockReward = await ToxxicToken.blockReward();
            expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function() {
            // Transfer 25 tokens from owner to addr1
            await ToxxicToken.transfer(addr1.address, 25);
            const addr1Balance = await ToxxicToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(25);

            // Transfer 12.5 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another acct.
            await ToxxicToken.connect(addr1).transfer(addr2.address, 12.5);
            const addr2Balance = await ToxxicToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(12.5);
        });

        it("Should fail if sender doesn't have any tokens", async function() {
            const initialOwnerBalance = await ToxxicToken.balanceOf(owner.address);
            // Try to send 1 token from addr1[No tokens] to owner with [multiple tokens].
            // require will evaluate false and revert the transaction
            await expect (
                ToxxicToken.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance!");

            // Owner balance shouldn't have changed.
            expect(await ToxxicToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("Should update balances after transfers", async function() {
            const initialOwnerBalance = await ToxxicToken.balanceOf(owner.address);

            // Transfer 50 tokens from owner to addr1
            await ToxxicToken.transfer(addr1.address, 50);

            // Transfer another 50 tokens from owner to addr2
            await ToxxicToken.transfer(addr2.address, 50);

            // Check balances 
            const finalOwnerBalance =  await ToxxicToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(100));

            const addr1Balance = await ToxxicToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            const addr2Balance = await ToxxicToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        })
    })
}) 