// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contract

  // Get the ContractFactory and Signers here.
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(
    "0xb0A49b8c5dc44421c929CBe67Dc5F7f5616cAD3C"
  );

  // Wait for the contract to be deployed
  await factory.deployed();

  console.log("factory contract deployed to:", factory.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
