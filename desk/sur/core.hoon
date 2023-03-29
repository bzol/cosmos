/+  *zig-sys-smart
|%
+$  action  @tas
+$  module  [type=@tas =address]
+$  addresses  [owner=address pact=address data=address]
+$  core
  $:
    =addresses
    :: owner=address
    actions=(set action)
    modules=(set module)
  ==
+$  cores  (map id core)

+$  actions
  $%
    [%create from=address actions=(list path)]
    :: [%modify =id actions=(set action)]
    [%delete =id]
  ==
--
