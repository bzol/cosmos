/-  spider, zig-wallet
/+  strandio, conq=zink-conq, *zig-sys-smart, assembler2
=,  strand=strand:spider
=,  strand-fail=strand-fail:libstrand:spider
=<
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
;<  =bowl:spider  bind:m  get-bowl:strandio

::::::::::::::::::::::: multisig id, sec. address and sec. address account
=/  id  0x326.5a9d.ba9b.c6b8.56b7.6a2b.a6b8.84e9.92a1.3af1.02e9.a394.683b.af07.a2b8.7277.6113.e0c9.5043.d360.3513.8caf.c439.b6b6.c007.1e59.619e.276f.c3cd.3cde.a8d5.b606
=/  id-account  0xdc62.2c3b.f423.28f8.f67b.d16f.1c95.3850.a365.6cc3.2791.9576.bc11.1abf.cc72.e7d7
::  pact  0x66cb.be5e.ca3f.49c3.e70c.6750.d5e5.7d6d.e5cd.b91e.236a.46a0.d093.eaf5.91d4.ba4a
::  data  0x4721.7df8.8f33.fc5f.1d13.9a24.dae4.5d45.6429.40d5.1710.01c4.7bf9.b719.1e00.5a8d
=/  amount  100.000
=/  prim-address  0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70
=/  sec-address  0xe359.fe9d.4b15.de9d.ce22.6517.6ddd.30c7.4b96.c01e
=/  prim-address-account  0x89a0.89d8.dddf.d13a.418c.0d93.d4b4.e7c7.637a.d56c.96c0.7f91.3a14.8174.c7a7.71e6
=/  sec-address-account  0x7d2.06ca.d1f2.91d0.75aa.2fd2.144a.da0f.c32d.ad62.fc19.3940.fbcd.777c.3348.f07e
=/  origin  [~ [%dev /dev]]
::::::::::::::::::::::: factory contract compile, submit, sign
:: =/  test  (assemble:assembler2 ~[/(scot %p our.bowl)/collective/(scot %da now.bowl)/lib/actions/create-dao/hoon /(scot %p our.bowl)/collective/(scot %da now.bowl)/lib/actions/create-dao/hoon])
:: ~&  test

=/  test  (assemble:assembler2 ~[/(scot %p our.bowl)/collective/(scot %da now.bowl)/lib/actions/create-dao/hoon])
~&  test

=/  factory-contract  
  %-  compile-contract:conq 
  [/collective test]
=/  action  [%noun [%deploy %.n factory-contract ~ ~]] 
=/  transaction  [%transaction ~ prim-address 0x1111.1111 0x0 action]
~&  factory-contract
;<  ~  bind:m
  %+  poke:strandio 
    [~nec %uqbar] 
  [%wallet-poke !>(transaction)]
:::::::::::::::::::::: create new multisig contract and data
:: =/  action  [%create prim-address 'new-multisig2' 1 (silt ~[prim-address sec-address])]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %multisig] 
::   [%multisig-action !>(action)]
:: ::::::::::::::::::::::  transfer zigs from primary address to sec. address
:: =/  action  [%noun [%give sec-address amount prim-address-account]]
:: =/  transaction  [%transaction ~ prim-address 0x74.6361.7274.6e6f.632d.7367.697a 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]
::::::::::::::::::::::  transfer zigs from sec. address to multisig
:: =/  action  [%noun [%give (multisig-pact id) amount sec-address-account]]
:: =/  transaction  [%transaction origin sec-address 0x74.6361.7274.6e6f.632d.7367.697a 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio
::     [~zod %uqbar]
::   [%wallet-poke !>(transaction)]
:::::::::::::::::::::  send-proposal
:: =/  transaction  [%send-fungible id prim-address amount sec-address id-account]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %collective]
::   [%collective-action !>(transaction)]
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
--
