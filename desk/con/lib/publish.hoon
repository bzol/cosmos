/+  *zig-sys-smart
|%
+$  action
  $%
      $:  %deploy-and-init
          id=address
          mutable=?
          code=[bat=* pay=*]
          interface=pith
          init=calldata
      ==
  ::
      $:  %upgrade
          =id
          new-code=[bat=* pay=*]
          new-interface=pith
      ==
  ==
--
