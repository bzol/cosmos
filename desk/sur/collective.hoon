=,  ethereum-types
|%
+$  action
  $%
  :: client actions
    [%send-fungible multisig-id=address from=address amount=@ud to=address from-account=address]
    ::[%fund fund-id=id wallet=address asset-account=id asset-metadata=id amount=@ud]
    ::::
    ::[%update fund-id=id]
  ==

:: +$  update
::   $%
::     [%client =collectives]
::   ==
--
