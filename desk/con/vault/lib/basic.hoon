/+  *zig-sys-smart
|%
:: vault for storing one type of ERC-20 token in a vault
+$  bond
  $:  owner=address
      =escrow-asset
      depositors=(pmap ship [=address amount=@ud])
  ==
::
+$  escrow-asset
  $:  contract=id
      metadata=id
      amount=@ud
      account=id
  ==
::
+$  action
  $%  ::  create a new bond held by this contract.
      ::  sets escrow asset but not amount or depositors
      [%new-vault owner=address asset-metadata=id]
      ::  become a depositor in a bond -- caller must first
      ::  set appropriate allowance for this contract
      ::  can deposit multiple times
      [%deposit bond-id=id =ship amount=@ud account=id]
      ::  combo of above two used for %pokur
      $:  %new-bond-with-deposit
          custodian=address  timelock=@ud  asset-metadata=id
          =ship  amount=@ud  account=id
      ==
      ::  as a custodian, award tokens held in escrow
      ::  note that ships need to have been depositors
      ::  can award multiple times before timelock is reached
      [%award bond-id=id to=ship amount=@ud]
      ::  as a custodian, nullify the bond before its timelock
      [%refund bond-id=id]
      ::  anyone can submit -- returns all funds to depositors
      ::  if the bond's timelock has passed and not all tokens
      ::  have been awarded. if tokens have been *partially*
      ::  awarded such that any depositor has been given more
      ::  than they deposited, outstanding claims will exceed
      ::  tokens in bond. in this case, tokens are only awarded
      ::  to caller in accordance with their claim. other
      ::  depositors may perform a %release call afterwards
      ::  to claim their funds -- later callers are less likely
      ::  to get full/any refund -- try to be first
      [%release =ship bond-id=id]
      ::  handle token standard %push action
      ::  the actions this handles: %deposit, %new-bond-with-deposit
      [%on-push from=id amount=@ud calldata=*]
  ==
::
::  standard fungible token metadata
::
+$  token-metadata
  $:  name=@t
      symbol=@t
      decimals=@ud
      supply=@ud
      cap=(unit @ud)
      mintable=?
      minters=(pset address)
      deployer=address
      salt=@
  ==
--
