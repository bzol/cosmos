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

=/  factory-contract  0x7ef8.4cd6.2d57.5589.f275.ba84.9b36.99f9.3180.0740.0fae.7023.7094.cbcd.8ffd.eb8e
=/  action  [%noun [%deploy from]]
=/  transaction  [%transaction ~ from factory-contract 0x0 action]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %uqbar] 
  [%wallet-poke !>(transaction)]

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
