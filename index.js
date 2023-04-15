const fs = require('fs'); // handle files
const { CasperClient, Contracts, Keys, RuntimeArgs, CLValueBuilder, CLKey, CLAccountHash } = require('casper-js-sdk'); // handle Casper
const client = new CasperClient('http://89.58.52.98:7777/rpc'); // Casper node client instance 
const contract = new Contracts.Contract(client); // Smart Contract object, to interact with Casper
const keys = Keys.Ed25519.loadKeyPairFromPrivateFile('./keys/secret_key.pem'); // need secret key to sign every transaction passed to Smart Contract on blockchain 
const wasm = new Uint8Array(fs.readFileSync('./contract/target/wasm32-unknown-unknown/release/contract.wasm')); // WASM Smart Contract binary compiled from Rust code 

async function install() {
    // prepare Smart Contract arguments - pass only one variable 'amout' with value '123'
    const args = RuntimeArgs.fromMap({ 'amount': CLValueBuilder.u512(9000000000) });

    const deploy = contract.install(
        wasm, // smart contract binary
        args, // smart contract arguments (amount: 123)
        '20000000000', // 20 CSPR - transaction cost
        keys.publicKey, // public key <as name sugest>
        'casper-test', // testnet blockchain network
        [keys] // privat key is assignet to public key
    );

    try {
        return (await client.putDeploy(deploy));
    } catch (error) {
        return error;
    }
}

// install()
//     .then(deployHash => console.log('deployHash', deployHash))
//     .catch(error => console.log('error', error));

async function transferAmount() {
    contract.setContractHash('hash-bf49ece348c7df1f80ee40f9095debbf5551ef591542d54f65385b5c6186e479');

    const amount = 2000000000; // 2 CSPR

    // convert from account hash to CLKey accepted by Smart Contract
    const receiverAccountHash = '63b82f736afb9ae7177398ed8dd18cc662119d52ad0c509c3881d83b606d3b61';
    const receiverUint8Array = Uint8Array.from(Buffer.from(receiverAccountHash, 'hex'));
    const keyFromAccountHash = new CLKey(new CLAccountHash(receiverUint8Array));

    // pass converted from account hash key ass deploy argument
    const args = RuntimeArgs.fromMap(
        {
            'account_hash': keyFromAccountHash,
            'amount': CLValueBuilder.u512(amount),
        }
    );

    const deploy = contract.callEntrypoint(
        'transfer_amount', // entry point name
        args, // arguments with second account hash-as-key
        keys.publicKey,
        'casper-test',
        '30000000000', // 30 CSPR 
        [keys]
    );

    try {
        return (await client.putDeploy(deploy));
    } catch (error) {
        console.error(error.message);
    }
}

transferAmount()
    .then(deployHash => console.log('deployHash', deployHash))
    .catch(error => console.log('error', error));