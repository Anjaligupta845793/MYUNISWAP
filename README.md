## Introduction

This DEX project is built using Uniswap V2's core and periphery contracts. It provides a platform for users to trade ERC20 tokens in a decentralized manner. The project aims to replicate the core functionalities of Uniswap while offering insights into how decentralized exchanges operate on the Ethereum blockchain.

## Features

- **Create Token Pairs**: Users can create new trading pairs for any two ERC20 tokens.
- **Add Liquidity**: Liquidity providers can add tokens to a pair and receive LP (Liquidity Provider) tokens in return.
- **Swap Tokens**: Users can swap one token for another directly through the DEX.
- **Remove Liquidity**: Liquidity providers can withdraw their tokens along with any accrued fees.

## Architecture

The project is structured around the following key components:

- **UniswapV2Factory**: This contract manages the creation of new token pairs.
- **UniswapV2Pair**: Each pair of tokens has its own contract that facilitates swaps and liquidity management.
- **UniswapV2Router02**: This contract provides methods for adding/removing liquidity and swapping tokens.

  ## Technologies Used
- **Solidity**: Smart contract development.
- **Ethereum**: Blockchain platform.
- **ethers.js**: Interact with the Ethereum blockchain.


## Smart Contract Addresses

- **Router Address**: **`0x4097916ADE19672951869407bCeaAD34CFE73922`**
- **Factory Address**: **`0x3895cf306d7aaC148847e582a33f0663D2b338E2`**
- **Token A Address**: **`0x7335E1930467d7e23257da209E79111Ecd1FA7eb`**
- **Token B Address**: **`0x10eD1253756089d904Edb7FA1a5A50f03CF037eC`**
- **My DEX Address**: **`0x36aAC9C2F3991734925AbA55a6c7Cc82851d8DcA`**

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MYUNISWAP.git
   cd dex-practice
   ```

Install dependencies:
bash
npm install
