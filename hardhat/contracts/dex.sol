// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol"; // Importing Factory Interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyDex {
    IUniswapV2Router02 public uniswapRouter;
    IUniswapV2Factory public uniswapFactory; // Declare a variable for the factory
    address public tokenA; // Address of Token A
    address public tokenB; // Address of Token B
    event LiquidityAdded(address indexed user, uint256 amountA, uint256 amountB);
    event TokensSwapped(address indexed user, uint256 amountIn, uint256 amountOut);
    event LiquidityRemoved(address indexed user);

    constructor(address _router, address _factory, address _tokenA, address _tokenB) {
        uniswapRouter = IUniswapV2Router02(_router);
        uniswapFactory = IUniswapV2Factory(_factory); // Instantiate the factory
        tokenA = _tokenA;
        tokenB = _tokenB;
    }
     //for adding liquidity 
    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(IERC20(tokenA).allowance(msg.sender, address(this)) >= amountA, "Insufficient allowance for token A");
        require(IERC20(tokenB).allowance(msg.sender, address(this)) >= amountB, "Insufficient allowance for token B");
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), amountB), "Transfer of token B failed");

        require(IERC20(tokenA).approve(address(uniswapRouter), amountA), "Approval of token A failed");
        require(IERC20(tokenB).approve(address(uniswapRouter), amountB), "Approval of token B failed");


        uniswapRouter.addLiquidity(
            tokenA,
            tokenB,
            amountA,
            amountB,
            1, // slippage is unavoidable
            1, // slippage is unavoidable
            msg.sender,
            block.timestamp + 600
        );
        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function swapTokens(uint256 amountIn, uint256 amountOutMin) external {
        require(IERC20(tokenA).allowance(msg.sender, address(this)) >= amountIn, "Insufficient allowance for token A");
       require(IERC20(tokenA).transferFrom(msg.sender, address(this), amountIn), "Transfer of token A failed");

        require(IERC20(tokenA).approve(address(uniswapRouter), amountIn), "Approval of token A failed");
        address[] memory path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;

        uniswapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp + 600
        );
        emit TokensSwapped(msg.sender, amountIn, amountOutMin);
    }

    function removeLiquidity(uint256 liquidity) external {
        // Get pair address from factory
        address pairAddress = uniswapFactory.getPair(tokenA, tokenB); // Call getPair on factory
         require(IERC20(pairAddress).allowance(msg.sender, address(this)) >= liquidity, "Insufficient allowance for LP tokens");

        // Transfer LP tokens to this contract
require(IERC20(pairAddress).transferFrom(msg.sender, address(this), liquidity), "Transfer of LP tokens failed");
        // Approve the router to spend LP tokens
 require(IERC20(pairAddress).approve(address(uniswapRouter), liquidity), "Approval of LP tokens failed");
        uniswapRouter.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            1, 
            1, 
            msg.sender,
            block.timestamp + 600
        );
            emit LiquidityRemoved(msg.sender);

    }
    function createPair() external returns (address pair) {
        return uniswapFactory.createPair(tokenA, tokenB);
    }

    // Get pair function
    function getPair() external view returns (address pair) {
        return uniswapFactory.getPair(tokenA, tokenB);
    }

}