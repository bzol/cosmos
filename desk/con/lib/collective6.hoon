/+  *zig-sys-smart
|%
++  sur
  |%
  +$  asset
    $:  contract=id
        metadata=id
        amount=@ud
        account=id
    ==
  +$  member  [address shares=@ud]
  ::
  +$  state
    $:  name=@t
        members=(pset member)
        assets=(pset asset)
    ==
  
  +$  action
    $%  ::  Current actions
        [%create name=@t members=(pset address)]
        [%fund2 collective=id =address =asset]
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
