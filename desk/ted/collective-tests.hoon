/-  spider, zig-wallet
/+  strandio, conq=zink-conq, *zig-sys-smart
/=  factory-lib  /con/collective/lib/multisig-factory
=,  strand=strand:spider
=,  strand-fail=strand-fail:libstrand:spider
=<
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
;<  =bowl:spider  bind:m  get-bowl:strandio

::::::::::::::::::::::: multisig id, sec. address and sec. address account
=/  id  0x374a.5968.0045.865f.6273.eb50.a303.25a8.2acd.f5a4.9981.a4c9.b645.1720.6ff3.1486.189e.fea6.4271.a6e6.677c.1fca.e5fc.bf9f.7750.a17e.ff5c.2669.7261.c7dc.2678.33c8
::  pact  0xaae.3121.6c71.cf29.2089.1a3a.d986.21ce.9f0d.79b0.cba9.2878.3b6d.bae8.ef40.5584
::  data  0x34.2f33.7c1f.14ec.005c.4c6b.1f10.fff8.5262.8cf5.47c6.8c43.c113.207b.1b0a.2d8d
=/  id-account  0x7d2.06ca.d1f2.91d0.75aa.2fd2.144a.da0f.c32d.ad62.fc19.3940.fbcd.777c.3348.f07e
=/  amount  1.000.000
=/  prim-address  0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70
=/  sec-address  0xe359.fe9d.4b15.de9d.ce22.6517.6ddd.30c7.4b96.c01e
=/  sec-address-account  0x7d2.06ca.d1f2.91d0.75aa.2fd2.144a.da0f.c32d.ad62.fc19.3940.fbcd.777c.3348.f07e
::::::::::::::::::::::: factory contract compile, submit, sign
:: =/  factory-contract  
::   %-  compile-path:conq 
::   [(scot %p p.byk.bowl) %collective (scot %da p.r.byk.bowl) %con %collective %multisig-factory %hoon ~]
:: =/  action  [%noun [%deploy %.n factory-contract ~ ~]] 
:: =/  transaction  [%transaction ~ prim-address 0x1111.1111 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]
::::::::::::::::::::::  transfer zigs to primary address from sec. address
:: =/  action  [%noun [%give prim-address amount sec-address-account]] 
:: =/  transaction  [%transaction ~ sec-address 0x74.6361.7274.6e6f.632d.7367.697a 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]
::::::::::::::::::::::  transfer zigs from sec. address to multisig
:: =/  action  [%noun [%give (multisig-pact id) amount sec-address-account]]
:: =/  transaction  [%transaction ~ sec-address 0x74.6361.7274.6e6f.632d.7367.697a 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]
:::::::::::::::::::::  send-proposal
=/  transaction  [%send-fungible id prim-address amount sec-address id-account]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %collective] 
  [%collective-action !>(transaction)]
::::::::::::::::::::::::::: vote on proposal
::=/  transaction  [%send-fungible id prim-address amount sec-address sec-address-account]
::;<  ~  bind:m
::  %+  poke:strandio 
::    [~zod %collective] 
::  [%collective-action !>(transaction)]
:::::::::::::::::::::::::::::
(pure:m !>(~))
::
|%
+$  input  (unit from=@ux)
++  multisig-pact  
  |=  =id
  (hash-pact 0x0 id 0x0 multisig-nock:factory-lib)
++  multisig-data  
  |=  =id
  (hash-data (multisig-pact id) (multisig-pact id) 0x0 0)
:: unused
:: ;<  =cage  bind:m  (take-fact:strandio /wallet)
:: ;<  ~  bind:m
::   (watch:strandio /wallet [~zod %uqbar] [%wallet %x %y ~])
:: ;<  vmsg=vase   bind:m  (take-poke:strandio %foo)
:: ;<    =pending-store:zig-wallet
::     bind:m
::   (scry:strandio pending-store:zig-wallet [%gx %wallet %pending-store (scot %ux from) %noun ~])
:: =/  multisig-contract  
::   %-  compile-path:conq 
::   [(scot %p p.byk.bowl) %collective (scot %da p.r.byk.bowl) %con %multisig %hoon ~]
::   ~&  multisig-contract
--
