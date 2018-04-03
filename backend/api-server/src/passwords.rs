use ring::{digest, pbkdf2};
use rustc_serialize::hex::ToHex;

const SALT_PREFIX: &str = "0ff231bac4f1bf4b4c5aca8b73afc803930a5aada5de98b2fe054460cc2dfcf3";
const KEY_BYTE_COUNT: usize = 16;
const ROUNDS: u32 = 100_000;

pub fn encrypt_password(username: &str, password: &str) -> String {
    let salt = salt(username);
    let password = password.as_bytes();
    let mut result = [0u8; KEY_BYTE_COUNT];
    pbkdf2::derive(&digest::SHA256, ROUNDS, &salt, &password, &mut result);
    result.to_hex()
}

fn salt(username: &str) -> Vec<u8> {
    let username = username.as_bytes();
    let salt_prefix = SALT_PREFIX.as_bytes();
    let mut salt = Vec::with_capacity(salt_prefix.len() + username.len());
    salt.extend(salt_prefix);
    salt.extend(username);
    salt
}
