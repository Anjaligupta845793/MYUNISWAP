import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [dex, setdex] = useState([]);
  const [A, setA] = useState([]);
  const [B, setB] = useState([]);
  // Import Hardhat artifacts

  // Contract ABI (Application Binary Interface)

  const connectwallet = async () => {
    // Connect to Ethereum network
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // Get ABI and bytecode
    const myDexABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_router",
            type: "address",
          },
          {
            internalType: "address",
            name: "_factory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "_tokenB",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
        ],
        name: "LiquidityAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "LiquidityRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
        ],
        name: "TokensSwapped",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
        ],
        name: "addLiquidity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "createPair",
        outputs: [
          {
            internalType: "address",
            name: "pair",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getPair",
        outputs: [
          {
            internalType: "address",
            name: "pair",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
        ],
        name: "removeLiquidity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
        ],
        name: "swapTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenA",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenB",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "uniswapFactory",
        outputs: [
          {
            internalType: "contract IUniswapV2Factory",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "uniswapRouter",
        outputs: [
          {
            internalType: "contract IUniswapV2Router02",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    // Contract parameters
    const routerAddress = "0x4097916ADE19672951869407bCeaAD34CFE73922"; // Replace with actual Uniswap Router address
    const factoryAddress = "0x3895cf306d7aaC148847e582a33f0663D2b338E2"; // Replace with actual Uniswap Factory address
    const tokenAAddress = "0x7335E1930467d7e23257da209E79111Ecd1FA7eb"; // Replace with actual Token A address
    const tokenBAddress = "0x10eD1253756089d904Edb7FA1a5A50f03CF037eC"; // Replace with actual Token B address

    // Deploy the contract
    const myDexAddress = "0x36aAC9C2F3991734925AbA55a6c7Cc82851d8DcA"; // Replace with your deployed contract address

    // Create a contract instance
    const myDexContract = new ethers.Contract(myDexAddress, myDexABI, signer);
    console.log(`contract dex  `);
    console.log(myDexContract);
    setdex(myDexContract);

    // Example of approving tokens for MyDex contract for Token A
    console.log("getting tokenA contract");

    const tokenAContract = new ethers.Contract(
      tokenAAddress,
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "initialSupply",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "allowance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientAllowance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientBalance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "approver",
              type: "address",
            },
          ],
          name: "ERC20InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
          ],
          name: "ERC20InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSpender",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      signer
    );
    console.log("got token a contract ");
    console.log(tokenAContract);
    setA(tokenAContract);

    // Approving 10,000 tokens for Token A

    console.log("giving approval to tokenA");

    // Example of approving tokens for MyDex contract for Token B
    const tokenBContract = new ethers.Contract(
      tokenBAddress,
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "initialSupply",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "allowance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientAllowance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientBalance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "approver",
              type: "address",
            },
          ],
          name: "ERC20InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
          ],
          name: "ERC20InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSpender",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      signer
    );
    console.log("token B contracct");
    console.log(tokenBContract);
    setB(tokenBContract);
  };

  const approveA = async () => {
    const approveAmountA = ethers.utils.parseUnits("10000", 18);
    const txApproveTokenA = await A.approve(dex.address, approveAmountA, {
      gasPrice: ethers.utils.parseUnits("25", "gwei"), // Adjust this value as needed
    });
    console.log("gave approval");
    await txApproveTokenA.wait();
    console.log(
      `Approved ${approveAmountA.toString()} of Token A for MyDex contract.`
    );

    // Example of adding liquidity

    // Example of swapping tokens

    // Example of removing liquidity
  };
  const approveB = async () => {
    const approveAmountB = ethers.utils.parseUnits("10000", 18); // Approving 10,000 tokens for Token B

    const txApproveTokenB = await B.approve(dex.address, approveAmountB, {
      gasPrice: ethers.utils.parseUnits("25", "gwei"), // Adjust this value as needed
    });
    await txApproveTokenB.wait();
    console.log(
      `Approved ${approveAmountB.toString()} of Token B for MyDex contract.`
    );
  };
  const addLiquidity = async () => {
    const amountA = ethers.utils.parseUnits("2000", 18); // Amount of Token A
    const amountB = ethers.utils.parseUnits("2000", 18); // Amount of Token B

    const txAddLiquidity = await dex.addLiquidity(amountA, amountB, {
      gasPrice: ethers.utils.parseUnits("25", "gwei"), // Adjust this value as needed
    });
    await txAddLiquidity.wait();
    console.log("Liquidity added!");
  };
  const removeLiquidity = async () => {
    const liquidity = ethers.utils.parseUnits("100", 18); // Amount of LP tokens to remove

    const txRemoveLiquidity = await dex.removeLiquidity(liquidity, {
      gasLimit: 300000,
    });
    await txRemoveLiquidity.wait();
    console.log("Liquidity removed!");
  };
  const swap = async () => {
    const amountIn = ethers.utils.parseUnits("500", 18); // Amount of Token A to swap
    const amountOutMin = ethers.utils.parseUnits("100", 18); // Minimum amount of Token B to receive

    const txSwapTokens = await dex.swapTokens(amountIn, amountOutMin, {
      gasPrice: ethers.utils.parseUnits("25", "gwei"), // Adjust this value as needed
    });
    await txSwapTokens.wait();
    console.log("Tokens swapped!");
  };

  return (
    <>
      <button onClick={connectwallet}>connect</button>
      <button onClick={approveA}>approveA</button>
      <button onClick={approveB}>approveB</button>
      <button onClick={addLiquidity}>addLiquidity</button>
      <button onClick={swap}>swap</button>
      <button onClick={removeLiquidity}>remove</button>
    </>
  );
}

export default App;
