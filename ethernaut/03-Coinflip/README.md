[3. Coin Flip](https://ethernaut.openzeppelin.com/level/0x4dF32584890A0026e56f7535d0f2C6486753624f)
---

- Because contract use blockhash for random number. this is the bad idea then we can do 2 ways:

1. make the same logic with proxy contract to send `true` or `false`
2. proxy contract to call CoinFlip if false then we revert it.


## Lesson Learned

- No true randomness in smart contract.
- Be careful when calculating "randomness"
- [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number/)