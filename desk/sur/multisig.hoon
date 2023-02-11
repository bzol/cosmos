=,  ethereum-types
|%
+$  multisig  
  $:
      name=@t
      factory=address
      data=address
      :: members
  ==
::
+$  state  (map address multisig)
::
++  multisig-factory-address  13
+$  action
  $%
    [%create name=@t threshold=@ud members=(set address)]
    ::
    :: [%propose x=?]
    :: [%execute x=?]
    :: [%add-member x=?]
  ==
:: +$  update
::   $%
::     [%client =collectives]
::   ==
--
