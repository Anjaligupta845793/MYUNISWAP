// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contract
  const totalSupply = 50000000000000000000000n;
  // Get the ContractFactory and Signers here.
  const TokenB = await hre.ethers.getContractFactory("ERC20");
  const tokenB = await TokenB.deploy(totalSupply);

  // Wait for the contract to be deployed
  await tokenB.deployed();

  console.log("tokenB contract deployed to:", tokenB.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
