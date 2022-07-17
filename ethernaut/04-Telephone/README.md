[4. Telephone](https://ethernaut.openzeppelin.com/level/0x0b6F6CE4BCfB70525A31454292017F640C10c768)
---

Because there is only one function then it's easy to guess that need to focus on it.

1. Create a new contract that take the Telephone's contract address.
2. call `changeOwner` function by send address of the attacker.
3. Then it will change the ownership of the **Telephone** contract.

## Hardhat

- [04-telephone](/scripts/04-telephone.ts)

## Lesson Learned

- `tx.origin` is the original user wallet that initial the transaction.
- `tx.origin` is user wallet address, not contract address.
- `msg.sender` a person who call a function (both user wallets and smart oontracts)

## Further Reading

- [Solidity: Tx Origin Attacks](https://medium.com/coinmonks/solidity-tx-origin-attacks-58211ad95514)
- [Phishing with tx.origin](https://solidity-by-example.org/hacks/phishing-with-tx-origin/)
