/-  spider, zig-wallet
/+  strandio, conq=zink-conq, *zig-sys-smart
=,  strand=strand:spider
=,  strand-fail=strand-fail:libstrand:spider
=<
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=/  arg  !<(input arg)
=/  from  0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70
;<  =bowl:spider  bind:m  get-bowl:strandio

:: factory contract compile, submit, sign

=/  factory-contract  
  %-  compile-path:conq 
  [(scot %p p.byk.bowl) %collective (scot %da p.r.byk.bowl) %con %collective %multisig-factory %hoon ~]
=/  action  [%noun [%deploy %.n factory-contract ~ ~]] 
=/  transaction  [%transaction ~ from 0x1111.1111 0x0 action]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %uqbar] 
  [%wallet-poke !>(transaction)]
(pure:m !>(~))
::
|%
+$  input  (unit from=@ux)
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
