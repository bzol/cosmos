/+  smart=zig-sys-smart
|%
+$  id  @ux
+$  asset  @ud
+$  proposal
  $:  calls=(list call:smart)
      votes=(map address:smart ?)
      ayes=@ud
      nays=@ud
  ==
+$  multisig  
  $:
      init=?
      name=@t
      members=(set address:smart)
      threshold=@ud
      executed=(list @ux)
      pending=(map @ux proposal)
      assets=(map @ux asset)
  ==
::
+$  multisigs  (map id multisig)
+$  state  =multisigs
::
++  multisig-factory-address  13
+$  action
  $%
    [%create from=address:smart name=@t threshold=@ud members=(set address:smart)]
    ::
    [%vote =id from=address:smart proposal-hash=@ux aye=?]
    [%propose =id proposer=address:smart calls=(list call:smart)]
    :: [%add-member =id =address:smart]
    :: [%remove-member =id =address:smart]
  ==
+$  update
  $%
    [%client =multisigs]
  ==
--
