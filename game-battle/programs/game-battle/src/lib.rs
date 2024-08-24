use anchor_lang::prelude::*;

declare_id!("C815oTNXMGKTCfrYEVoyZhLAHGWXn1Lo8HBsYnk7eo7T");

#[program]
pub mod game_battle {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
