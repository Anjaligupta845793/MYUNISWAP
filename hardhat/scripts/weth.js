// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contract

  // Get the ContractFactory and Signers here.
  const WETH = await hre.ethers.getContractFactory("WETH9");
  const weth = await WETH.deploy();

  // Wait for the contract to be deployed
  await weth.deployed();

  console.log("weth contract deployed to:", weth.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
