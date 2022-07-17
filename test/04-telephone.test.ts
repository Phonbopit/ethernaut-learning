import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('04 - Telephone', () => {
  let Contract;
  let telephone: Contract; // Telephone's contract.
  let contract: Contract;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  before(async () => {
    const Telephone = await ethers.getContractFactory('Telephone');
    telephone = await Telephone.deploy();
  });

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('AttackTelephone');
    [owner, attacker] = await ethers.getSigners();

    contract = await Contract.connect(attacker).deploy(telephone.address);
  });

  describe('#takeOwnership', () => {
    it('should return default owner address', async () => {
      const ownerAddress = await telephone.owner();
      expect(ownerAddress).to.eq(owner.address);
    });

    it('should able to change ownership', async () => {
      // takeover with attacker address
      await contract.connect(attacker).takeOwnership(attacker.address);

      const ownerAddress = await telephone.owner();

      expect(ownerAddress).to.eq(attacker.address);
    });
  });
});
