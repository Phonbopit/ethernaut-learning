import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('02 - Fallout', () => {
  let Contract;
  let contract: Contract;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('Fallout');
    [owner, attacker] = await ethers.getSigners();

    contract = await Contract.deploy();
  });

  describe('#collectAllocations', () => {
    it('should able to collect if sender is owner (takeover)', async () => {
      // takeover
      await contract.connect(attacker).Fal1out();

      // Collect as onwer
      await contract.connect(attacker).collectAllocations();

      // owner is attacker address.
      expect(await contract.owner()).to.eq(attacker.address);
    });

    it('should fail if sender is not an owner', async () => {
      await expect(
        contract.connect(attacker).collectAllocations()
      ).to.be.revertedWith('caller is not the owner');
    });
  });
});
