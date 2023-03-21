|%
::  two variables for any action available are "input" and "modules"
++  contract-head  
'''
/+  *zig-sys-smart
|_  =context
+$  modules  (pset [type=@tas address])
+$  action
  $%  ::  called once to initialize multisig
      [%create ?]
      [%create-dao members=(pset address)]
  ==
++  write
  |=  act=action
  ^-  (quip call diff)
  ?:  ?=(%create -.act)
    =/  =id  (hash-data this.context this.context town.context 0)
    =/  =item
      :*  %&  id
          this.context
          this.context
          town.context
          0
          %core  ~
      ==
    `(result ~ item^~ ~ ~)
  :: =+  (need (scry-state (hash-data this.context this.context town.context 0)))
  :: =/  core-data  (husk modules - `this.context ~)
  :: `(result ~ ~ ~ ~)
  ?-    -.act
      %create-dao
    `(result ~ ~ ~ ~)
  ==
::
++  read
  |_  =path
    ++  json
      ~
    ++  noun
      ~
    --
--
'''
++  contract-body  
'''
gfdjgkdjgd
'''
++  contract-tail  
'''
gfdgd
'''
++  assemble  |=  modules=(list @tas)
contract-head
--


