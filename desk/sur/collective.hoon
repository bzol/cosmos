=,  ethereum-types
|%
+$  action
  $%
  :: client actions
    [%send-fungible multisig-id=address proposer=address amount=@ud to=address account=address]
    ::[%fund fund-id=id wallet=address asset-account=id asset-metadata=id amount=@ud]
    ::::
    ::[%update fund-id=id]
  ==

:: +$  update
::   $%
::     [%client =collectives]
::   ==
--
