/-  spider, zig-wallet, multisig
/+  strandio, conq=zink-conq, *zig-sys-smart
/=  factory-lib  /con/collective/lib/multisig-factory
=,  strand=strand:spider
=,  strand-fail=strand-fail:libstrand:spider
=<
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=/  arg  !<(input arg)
=/  factory-contract  0x3e5d.aaf8.b053.4e5a.7b16.d615.89df.81f2.70d4.779e.40b0.0ddc.deac.c9b6.5889.2b51
;<  =bowl:spider  bind:m  get-bowl:strandio

=/  action  [%noun [%deploy id.arg]]
=/  transaction  [%transaction ~ from.arg factory-contract 0x0 action]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %uqbar] 
  [%wallet-poke !>(transaction)]
::
=/  multisig-pact  (hash-pact 0x0 id.arg 0x0 multisig-nock:factory-lib)
~&  multisig-pact
=/  action  [%noun [%create threshold.arg members.arg]]
=/  transaction  [%transaction ~ from.arg multisig-pact 0x0 action]
;<  ~  bind:m
  %+  poke:strandio 
    [~zod %uqbar] 
  [%wallet-poke !>(transaction)]
=/  multisig-data  (hash-data multisig-pact multisig-pact 0x0 0)
(pure:m !>(~))
::
|%
+$  input  [id=@ux from=@ux threshold=@ud members=(set address)]
:: unused
:: ;<  =cage  bind:m  (take-fact:strandio /wallet)
:: ;<  ~  bind:m
::   (watch:strandio /wallet [~zod %uqbar] [%wallet %x %y ~])
:: ;<  vmsg=vase   bind:m  (take-poke:strandio %foo)

:: good one?
:: =/  factory-contract  0x228.0a2b.1309.ca1b.21d8.8458.8e74.7e3f.8bf1.bf6e.6a1f.9a4f.e286.910c.a45b.2755
--
