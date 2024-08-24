use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};

use crate::state::Marketplace;
use crate::errors::MarketplaceError;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {

    #[account(mut)]
    pub admin: Signer<'info>,

    // #[account(
    //     init_if_needed,
    //     seeds = [constants::VAULT_SEED],
    //     bump,
    //     payer = signer,
    //     mint::decimals = 9,
    //     //token::burn = burn,
    //     mint::authority = token_vault_account,

    // )]
    // pub token_vault_account: Account<'info, TokenAccount>,


    #[account(
        init,
        space = Marketplace::INIT_SPACE,
        payer = admin,
        //seeds = [b"vault", name.as_str().as_bytes()],
        seeds = [b"vault"],
        bump
    )]
    pub marketplace: Box<Account<'info, Marketplace>>,

    #[account(
        init,
        //seeds = [b"synthetic_token", marketplace.key().as_ref()],
        seeds = [b"synthetic_token"],
        bump,
        payer = admin,
        mint::decimals = 9,
        mint::authority = marketplace,
    )]
    pub rewards_mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        //seeds = [b"treasury", marketplace.key().as_ref()],
        seeds = [b"treasury"],
        bump,
    )]
    pub treasury: SystemAccount<'info>,

    // #[account(
    //     init_if_needed,
    //     bump,
    //     payer = signer,

    // )]
    //pub mint: Account<'info, Mint>,
    //pub burn : Account <'info, Burn>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn init(&mut self, name: String, fee: u16, bumps: &InitializeBumps) -> Result<()> {
    
        require!(name.len() > 0 && name.len() < 33, MarketplaceError::NameTooLong);
        self.marketplace.set_inner(Marketplace {
            admin: self.admin.key(),
            fee,
            name,
            bump: bumps.marketplace,
            treasury_bump: bumps.treasury,
            rewards_bump: bumps.rewards_mint,
        });

        Ok(())
    }
}