// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contract

  // Get the ContractFactory and Signers here.
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(
    "0x4F70D61FFE47B8ea359334d532Ef346a750Ec8c8",
    "0x520DEFBB5426A36ED9890feB0A9E6051666D753c"
  );

  // Wait for the contract to be deployed
  await router.deployed();

  console.log("router contract deployed to:", router.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
