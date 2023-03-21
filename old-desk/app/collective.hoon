/-  sur=collective, groups, zig-wallet, indexer=zig-indexer
/+  default-agent, dbug,  smart=zig-sys-smart
/=  factory-lib  /con/collective/lib/multisig-factory
/=  fund  /con/lib/fund
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 *]
+$  card  card:agent:gall
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
      %collective-action
    =/  action  !<(action:sur vase)
    ?-    -.action
        %send-fungible  
      =/  transaction  [%propose multisig-id.action proposer.action ~[[0x74.6361.7274.6e6f.632d.7367.697a 0x0 [%give 100.000.100 to.action amount.action account.action]]]]
      :_  this
      :~
          :*
          %pass   /collective
          %agent  [our.bowl %multisig]  
          %poke   %multisig-action
          !>  transaction
          ==
      ==
    ==
  ==
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ~&  'poke happened!'
  ~&  wire
  ~&  sign
  ~&  '-------------'
  ?+    wire  (on-agent:def wire sign)
      [%fund-response ~]
    ?.  ?=(%poke-ack -.sign)
      (on-agent:def wire sign)
    ?~  p.sign
      %-  (slog '%pokeit: poke succeeded!' ~)
      `this
    %-  (slog '%pokeit: poke failed!' ~)
    `this
  ::
  ==
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  test  13
++  multisig-pact  
  |=  =id:smart
  (hash-pact:smart 0x0 id 0x0 multisig-nock:factory-lib)
++  multisig-data  
  |=  =id:smart
  (hash-data:smart (multisig-pact id) (multisig-pact id) 0x0 0)
--
