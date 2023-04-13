#![no_std] // because it is Smart Contract
#![no_main] // because it is only for extern program call

extern crate alloc; // it is non-standard and need to be imported

// 'binary tree' map for key - value pairs, 'String' that can change size in runtime, and 'vec' as "dynamic" array for Smart Contract params
use alloc::{collections::BTreeMap, string::String, vec};

// need this for Smart Contract creation
use casper_contract::{
    contract_api::{
        account, // need 'account' for getting 'purse'
        runtime, // need 'runtime' for getting passed params,
        storage, // need 'storage for saveing data in Smart Contract local state,
        system,  // need 'system' for transfer CSPR from account to another
    },
    unwrap_or_revert::UnwrapOrRevert, // stop execution if error occur (runtime revert synthetic sugger)
};

use casper_types::{
    CLType, //serialized data type inside EntryPoint
    EntryPoint, // entry point to Smart Contract that gets params on enter
    EntryPointAccess, // who can access Entry Point
    EntryPointType, 
    EntryPoints,
    Key, // account adress (hash)
    URef, // safe access to Smart Contract memory
    U512, // numeric type
};

#[no_mangle]
pub fn transfer_amount() {
    let source_purse = runtime::get_key("second_purse")
        .unwrap()
        .into_uref()
        .unwrap();

    let account_hash_key: Key = runtime::get_named_arg("account_hash");
    let target_account_hash = account_hash_key.into_account().unwrap();
    let amount = U512::from(1000000000);

    // system::transfer_to_account exist, but it is not so safe
    system::transfer_from_purse_to_account(source_purse, target_account_hash, amount, None)
        .unwrap_or_revert();
}

#[no_mangle]
pub extern "C" fn call() {
    let amount: U512 = runtime::get_named_arg("amount");
    let source: URef = account::get_main_purse();

    //create purse
    let second_purse = system::create_purse();

    //fund purse
    system::transfer_from_purse_to_purse(source, second_purse, amount, None).unwrap_or_revert();

    let mut named_keys: BTreeMap<String, Key> = BTreeMap::new(); // key is String, and value in Key (account hash) in this map

    //store purse into contract's named_keys
    named_keys.insert(String::from("second_purse"), second_purse.into());

    // Create entry point
    let mut entry_points = EntryPoints::new();
    entry_points.add_entry_point(EntryPoint::new(
        "transfer_amount",
        vec![],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));

    let (stored_contract_hash, _) =
        storage::new_locked_contract(entry_points, Some(named_keys), None, None);
    runtime::put_key("transfer_contract", stored_contract_hash.into());
}
