const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory for DexPlatform
  /* const accounts = await ethers.getSigners(1);
  console.log(accounts); */
  const DexPlatform = await ethers.getContractFactory("MyDex");

  // Deploy the contract
  const dexPlatform = await DexPlatform.deploy(
    "0x4097916ADE19672951869407bCeaAD34CFE73922",
    "0x3895cf306d7aaC148847e582a33f0663D2b338E2",
    "0x7335E1930467d7e23257da209E79111Ecd1FA7eb",
    "0x10eD1253756089d904Edb7FA1a5A50f03CF037eC"
  );

  // Wait for the deployment to be mined
  await dexPlatform.deployed();

  console.log("DexPlatform deployed to:", dexPlatform.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
