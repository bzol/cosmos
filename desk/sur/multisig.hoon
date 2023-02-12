/+  *zig-sys-smart
|%
+$  proposal
  $:  calls=(list call)
      votes=(map address ?)
      ayes=@ud
      nays=@ud
  ==
+$  multisig  
  $:
      name=@t
      pact=address
      data=address
      members=(set address)
      threshold=@ud
      executed=(list @ux)
      pending=(map @ux proposal)
      :: members
  ==
::
+$  state  (map id multisig)
::
++  multisig-factory-address  13
+$  action
  $%
    [%create name=@t threshold=@ud members=(set address)]
    ::
    [%vote =id proposal-hash=@ux aye=?]
    [%propose =id calls=(list call)]
    [%add-member =id =address]
    [%remove-member =id =address]
  ==
+$  update
  $%
    [%client =state]
  ==
--
