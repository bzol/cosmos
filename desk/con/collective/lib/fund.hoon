/+  *zig-sys-smart
|%
++  sur
  |%
  +$  member  [shares=@ud]
  ::
  +$  state
    $:  name=@t
        members=(pmap address member)
    ==
  
  +$  action
    $%  ::  Current actions
        [%create name=@t wallet=address =ship members=(list [address ship])]
        :: from-account: getting money from this account
        [%fund fund-id=id wallet=id asset-account=id asset-metadata=id amount=@ud]
        ::
        ::
        :: Implemented later as a complete multisig
        :: [%execute fund=id sigs=(pmap id sig) calls=(list call) deadline=@ud]
        :: [%vote fund=id proposal-hash=@ux aye=?]
        :: [%propose fund=id calls=(list call)]
        :: [%add-member fund=id =address]
        :: [%remove-member fund=id =address]
        :: [%set-threshold fund=id new=@ud]
    ==
  --
--
