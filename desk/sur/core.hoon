/+  *zig-sys-smart
|%
+$  action  @tas
+$  module  [type=@tas =address]
+$  core
  $:
    owner=address
    actions=(set action)
    modules=(set module)
  ==
+$  cores  (map id core)

+$  actions
  $%
    [%create =id actions=(set action)]
    :: [%modify =id actions=(set action)]
    [%delete =id]
  ==
--
