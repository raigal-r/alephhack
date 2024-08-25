use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};
use anchor_spl::{
    associated_token::AssociatedToken, 
    token::{
        Mint as TokenMint,
        Token, 
        TokenAccount
    }
};

use crate::{
    state::Fundraiser, FundraiserError, ANCHOR_DISCRIMINATOR, MIN_AMOUNT_TO_RAISE
};
use crate::errors::MarketplaceError;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {

    #[account(mut)]
    pub admin: Signer<'info>,
    pub mint_to_raise: Account<'info, TokenMint>,


    #[account(
        init,
        payer = admin,
        seeds = [b"fundraiser", admin.key().as_ref()],
        bump,
        space = ANCHOR_DISCRIMINATOR + Fundraiser::INIT_SPACE,
    )]
    pub fundraiser: Account<'info, Fundraiser>,

    #[account(
        init,
        payer = admin,
        associated_token::mint = mint_to_raise,
        associated_token::authority = fundraiser,
    )]
    pub vault: Account<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,



    #[account(
        init,
        space = Fundraiser::INIT_SPACE,
        payer = admin,
        //seeds = [b"vault", name.as_str().as_bytes()],
        seeds = [b"vault"],
        bump
    )]
    pub marketplace: Box<Account<'info, Fundraiser>>,

    #[account(
        init,
        seeds = [b"synthetic_token"],
        bump,
        payer = admin,
        mint::decimals = 9,
        mint::authority = marketplace,
    )]
    pub rewards_mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        seeds = [b"treasury"],
        bump,
    )]
    pub treasury: SystemAccount<'info>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn init(&mut self, amount: u64, duration: u16, name: String, fee: u16,  bumps: &InitializeBumps) -> Result<()> {
    
        require!(name.len() > 0 && name.len() < 33, MarketplaceError::NameTooLong);

        // Check if the amount to raise meets the minimum amount required
        require!(
            amount >= MIN_AMOUNT_TO_RAISE.pow(self.mint_to_raise.decimals as u32),
            FundraiserError::InvalidAmount
        );

        self.fundraiser.set_inner(Fundraiser {
            admin: self.admin.key(),
            amount_to_raise: amount,
            mint_to_raise: self.mint_to_raise.key(),
            current_amount: 0,
            time_started: Clock::get()?.unix_timestamp,
            duration,
            fee,
            name,
            bump: bumps.fundraiser,
            treasury_bump: bumps.treasury,
            rewards_bump: bumps.rewards_mint,
        });
        Ok(())
    }
}