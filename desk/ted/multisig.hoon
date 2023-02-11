/-  spider, zig-wallet
/+  strandio, conq=zink-conq, *zig-sys-smart
=,  strand=strand:spider
=,  strand-fail=strand-fail:libstrand:spider
=<
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
:: =/  arg  !<(input arg)
=/  from  0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70
;<  =bowl:spider  bind:m  get-bowl:strandio

=/  factory-contract  0x49d4.566a.4cae.80c0.afa9.6230.1232.e276.fa7b.08d8.692b.659d.ef91.6359.91a2.b62c
=/  action  [%noun [%deploy 0x123]]
=/  transaction  [%transaction ~ from factory-contract 0x0 action]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %uqbar] 
  [%wallet-poke !>(transaction)]

:: =/  multisig-contract  0xc048.1d18.164b.4924.ceee.dee4.cdc2.a79f.cdad.42a7.252b.83ff.2c87.ed2c.1124.4b06
:: =/  action  [%noun [%create 50 ~[from]]]
:: =/  transaction  [%transaction ~ from multisig-contract 0x0 action]
:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]

:: ;<  ~  bind:m
::   %+  poke:strandio 
::     [~zod %uqbar] 
::   [%wallet-poke !>(transaction)]

(pure:m !>(~))
::
|%
+$  input  (unit from=@ux)
:: unused
:: ;<  =cage  bind:m  (take-fact:strandio /wallet)
:: ;<  ~  bind:m
::   (watch:strandio /wallet [~zod %uqbar] [%wallet %x %y ~])
:: ;<  vmsg=vase   bind:m  (take-poke:strandio %foo)
--
