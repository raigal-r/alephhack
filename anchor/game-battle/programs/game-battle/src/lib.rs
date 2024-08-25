use anchor_lang::prelude::*;

// use anchor_spl::{token::{self,Mint,Token,TokenAccount}};
// use anchor_spl::token_interface::{Mint, TokenInterface};

// use crate::state::Marketplace;
// use crate::errors::MarketplaceError;

declare_id!("C815oTNXMGKTCfrYEVoyZhLAHGWXn1Lo8HBsYnk7eo7T");

pub mod state;
pub mod contexts;
pub mod errors;
pub mod constants;

pub use contexts::*;
pub use errors::*;
pub use constants::*;

// pub mod constants {
//     pub const VAULT_SEED: &[u8] = b"vault";
//     pub const STAKE_INFO_SEED: &[u8] = b"stake_info"; //Yo no lo tendría
//     pub const TOKEN_SEED: &[u8] = b"token";
// }

#[program]
pub mod game_battle {
    use super::*;

    // pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
    //     ctx.accounts.init(name, fee, &ctx.bumps) // Removed the semicolon here
    // }

    pub fn initialize(ctx: Context<Initialize>, amount: u64, duration: u16, name: String, fee: u16) -> Result<()> {

        ctx.accounts.init(amount, duration, name, fee, &ctx.bumps)?;
        Ok(())
    }

    pub fn contribute(ctx: Context<Contribute>, amount: u64) -> Result<()> {

        ctx.accounts.contribute(amount)?;
        Ok(())
    }
    pub fn check_contributions(ctx: Context<CheckContributions>) -> Result<()> {

        ctx.accounts.check_contributions()?;
        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {

        ctx.accounts.refund()?;
        Ok(())
    }

    pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
        ctx.accounts.create_listing(price, &ctx.bumps)?;
        ctx.accounts.deposit_nft()
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        ctx.accounts.withdraw_nft()
    }

    pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
        ctx.accounts.send_sol()?;
        ctx.accounts.send_nft()?;
        ctx.accounts.close_mint_vault()

    }
}


