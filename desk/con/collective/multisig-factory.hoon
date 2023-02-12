::  publish.hoon  [UQ| DAO]
::
::  Smart contract that processes deployment and upgrades
::  for other smart contracts. Automatically (?) inserted
::  on any town that wishes to allow contract production.
::
/+  *zig-sys-smart
/=  lib  /con/collective/lib/multisig-factory
|_  =context
++  write
  |=  act=action:lib
  ^-  (quip call diff)
  ?-    -.act
      %deploy
    =/  source=id  0x0
    :: have unique hash for each multisig
    =/  pact=item
      :*  %|
          (hash-pact source id.act town.context multisig-nock:lib)
          source
          id.act
          town.context
          multisig-nock:lib
          ~
          ~
      ==
    `(result ~ [pact ~] ~ ~)
      %random
    `(result ~ ~ ~ ~)
    :: :_  (result ~ [pact ~] ~ ~)
    :: :_  ~
    :: :+  id.p.pact
    ::   town.context
    :: [%create 0]
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
