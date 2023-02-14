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
=/  factory-contract  0xd4b3.2a52.fd2e.8d33.a203.7086.cffe.5f50.8f34.72c1.e42f.a9b9.0f99.2d78.2826.2b8b
=/  salt-id  0x4444
=/  from  0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70
=/  other-address  0xe359.fe9d.4b15.de9d.ce22.6517.6ddd.30c7.4b96.c01e
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
