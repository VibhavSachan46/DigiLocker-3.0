const {ethers} = require("hardhat");

async function main() {
  const Upload = await ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.waitForDeployment();

  const deployedAddress = await upload.getAddress();

  console.log("Library deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// 0x5FbDB2315678afecb367f032d93F642f64180aa3