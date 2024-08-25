use anchor_lang::prelude::*;

#[account]
pub struct Contributor {
    pub amount: u64,
}

impl Space for Contributor {
    const INIT_SPACE: usize = 8 + 32 + 2 + 1 + 1 + 1 + (4 + 32);
}