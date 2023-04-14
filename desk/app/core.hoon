/-  sur=core, groups, zig-wallet, indexer=zig-indexer
/+  default-agent, dbug,  smart=zig-sys-smart, assembler
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 cores:sur]
+$  card  card:agent:gall
::  supposedly desired publish contract
++  publish-address  0x2286.b3d1.e05c.9401.4c24.ba36.f785.917c.9664.4dcf.d82a.7a33.40c4.0bd1.8add.5a40
:: ++  publish-address  0x4854.7670.3177.2c46.2ac2.0c40.9085.1ffa.4155.112f.742f.cdfc.491d.c22b.5c41.5045
--
%-  agent:dbug
=|  state-0
=*  state  -
=<
^-  agent:gall
|_  =bowl:gall
+*  this     .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
::
++  on-init
  :-
  ~
  this(state [%0 ~])
++  on-save
  ^-  vase
  !>(state)
++  on-load
  on-load:def
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(actions:sur vase)
    ?-    -.action
        %create
      =/  id  `@ux`eny.bowl
      =/  code  (assemble:assembler actions.action)
      =/  calldata  [%create %.y]
      =/  contract-action  [%noun [%deploy-and-init [id %.n code calldata]]]
      =/  transaction  [%transaction ~ from.action publish-address 0x0 contract-action]
      :_  this
      :~
        :*
            %pass   /collective
            %agent  [our.bowl %uqbar]
            %poke   %wallet-poke
            !>  transaction
        ==
      ==
        %delete  
      [~ this]
    ==
  ==
      :: =/  transaction  [%propose multisig-id.action proposer.action ~[[0x74.6361.7274.6e6f.632d.7367.697a 0x0 [%give 100.000.100 to.action amount.action account.action]]]]
      :: :_  this
      :: :~
      ::     :*
      ::     %pass   /collective
      ::     %agent  [our.bowl %multisig]  
      ::     %poke   %multisig-action
      ::     !>  transaction
      ::     ==
      :: ==
    :: ==
  :: ==
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
  ::|=  =path
  ::^-  (unit (unit cage))
  ::?+    path  ~
  ::    [%x %block ^]
  ::  ?.  (~(has by dogs.state) t.t.path)  ~
  ::  :+  ~  ~
  ::  :-  %atom
  ::  !>(number:(~(got by dogs.state) t.t.path))
  ::::
  ::    [%x %dogs ~]
  ::  ``noun+!>(~(key by dogs.state))
  ::::
  ::    [%x %dogs %configs ~]
  ::  ``noun+!>((~(run by dogs.state) |=(=watchdog -.watchdog)))
  ::==
++  on-agent  on-agent:def
  ::|=  [=wire =sign:agent:gall]
  ::^-  (quip card _this)
  ::~&  'poke happened!'
  ::~&  wire
  ::~&  sign
  ::~&  '-------------'
  ::?+    wire  (on-agent:def wire sign)
  ::    [%fund-response ~]
  ::  ?.  ?=(%poke-ack -.sign)
  ::    (on-agent:def wire sign)
  ::  ?~  p.sign
  ::    %-  (slog '%pokeit: poke succeeded!' ~)
  ::    `this
  ::  %-  (slog '%pokeit: poke failed!' ~)
  ::  `this
  ::::
  ::==
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  test  13
++  multisig-pact
  |=  =id:smart
  (hash-pact:smart 0x0 id 0x0 ~)
++  multisig-data  
  |=  =id:smart
  (hash-data:smart (multisig-pact id) (multisig-pact id) 0x0 0)
--
