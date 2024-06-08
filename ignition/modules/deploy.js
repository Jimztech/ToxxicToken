const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

/*
const TokenModule = buildModule("TokenModule", (m) => {
    const ToxxicToken = hre.ethers.getContractFactory("ToxxicToken");
    const toxicToken = m.contract(ToxxicToken,["20000000000000000000000000"]);

    m.on("deploy", async () => {
        console.log("Token deployed to:", toxicToken.address);
    });

    return {toxicToken};
});




const TokenModule = buildModule("TokenModule", async (m) => {
    // Get the contract factory
    const ToxxicToken = await hre.ethers.getContractFactory("ToxxicToken");

    // Deploy the contract
    const toxicToken = await m.contract(ToxxicToken, ["20000000000000000000000000"]);

    // Log the deployed contract address
    console.log("Token deployed to:", toxicToken.address);

    return { toxicToken };
});





const TokenModule = buildModule("TokenModule", (m) => {
    // Get the contract factory
    const getToxxicTokenFactory = async () => {
        return await hre.ethers.getContractFactory("ToxxicToken");
    };

    // Define a contract instance placeholder
    let toxicToken;

    m.on("deploy", async () => {
        const ToxxicToken = await getToxxicTokenFactory();
        toxicToken = await m.contract(ToxxicToken, ["20000000000000000000000000"]);

        // Log the deployed contract address
        console.log("Token deployed to:", toxicToken.address);
    });

    return { get toxicToken() { return toxicToken; } };
});

*/

const TokenModule = buildModule("TokenModule", (m) => {
  const ToxxicToken = m.contract("ToxxicToken", ["20000000000000000000000000"]);

  return { ToxxicToken };
});


module.exports = TokenModule;