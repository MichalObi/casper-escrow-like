# Smart Contract project using Rust and Casper blockchain
This is a smart contract project that allows for the safe transfer of CSPR tokens from one account to another using a unique approach of creating a "second purse" to interact with the account balance. The project is written in Rust and can be compiled to a WebAssembly binary that can be deployed to the Casper blockchain network.

## Smart Contract Code
The Rust code of the smart contract defines the behavior of the contract when it is called. The `call()` function is executed when the smart contract is installed on the blockchain and it receives an argument amount that represents the amount of CSPR tokens to be transferred. The function creates a new empty purse, transfers the amount of CSPR tokens from the main account balance to the new purse using the `system::transfer_from_purse_to_purse()` function, and then stores the new purse into the contract's named keys.

The contract also defines a single entry point, `transfer_amount`, that transfers an amount of CSPR tokens from the new purse to a specified account. This function is not used in the current implementation of the smart contract, but it can be added and invoked later.

## Node.js Code
The Node.js code interacts with the smart contract on the Casper blockchain. The CaspterClient object is used to connect to the blockchain node and the Contracts.Contract object is used to deploy and interact with the smart contract.

The `install()` function deploys the smart contract to the blockchain with the specified arguments, including the amount of CSPR tokens to be transferred. The function returns a promise that resolves to the deployment result if successful or an error if the deployment fails.

The `CLValueBuilder` object is used to build the argument value, args, which is then passed to the `install()` function along with the smart contract binary, transaction cost, public key, network name, and private key.

## Getting Started

To deploy and interact with the smart contract, follow these steps:

1) Install Rust and the cargo toolchain on your computer.

2) Clone the project repository to your computer and navigate to the project directory.

3) Compile the Rust code to a WebAssembly binary by running the command `cargo build --release --target wasm32-unknown-unknown`.

4) Install Node.js and npm on your computer.

5) Install the casper-js-sdk package by running the command npm install `casper-js-sdk`.

6) Load your private key into the keys/secret_key.pem file.

7) Run the `install()` function in the node.js file to deploy the smart contract to the blockchain.

## Conclusion
This smart contract project demonstrates how to safely transfer CSPR tokens using a unique approach of creating a "second purse" to interact with the account balance. The project is written in Rust and can be compiled to a WebAssembly binary that can be deployed to the Casper blockchain network. With the `casper-js-sdk` package, it is easy to deploy and interact with the smart contract on the blockchain.