/+  *zig-sys-smart
|%
+$  action
  $%  $:  %deploy
          code=[bat=* pay=*]
          interface=(map @tas json)
          types=(map @tas json)
      ==
      :: $:  %upgrade
      ::     to-upgrade=id
      ::     new-code=[bat=* pay=*]
      :: ==
  ==
+$  multisig-nock  [0 1]
--
