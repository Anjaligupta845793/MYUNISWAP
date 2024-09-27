// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contract
  const totalSupply = 50000000000000000000000n;
  // Get the ContractFactory and Signers here.
  const TokenA = await hre.ethers.getContractFactory("ERC20");
  const tokenA = await TokenA.deploy(totalSupply);

  // Wait for the contract to be deployed
  await tokenA.deployed();

  console.log("tokenA contract deployed to:", tokenA.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
