/+  *zig-sys-smart
/=  lib  /con/collective/lib/core
=,  lib
|_  =context
++  write
  |=  act=action:sur
  ^-  (quip call diff)
  ?:  ?=(%create -.act)
    =/  =id  (hash-data this.context this.context town.context 0)
    =/  =item
      :*  %&  id
          this.context
          this.context
          town.context
          0
          %core  [~ ~]
      ==
    `(result ~ item^~ ~ ~)
  =+  (need (scry-state (hash-data this.context this.context town.context 0)))
  =/  core-data  (husk modules:sur - `this.context ~)
  ?-    -.act
      %create-dao
    `(result ~ ~ ~ ~)
::
++  read
  |_  =path
    ++  json
      ~
    ++  noun
      ~
    --
--
