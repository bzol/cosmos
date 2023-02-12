/-  sur=multisig, groups, zig-wallet, indexer=zig-indexer
/+  default-agent, dbug,  smart=zig-sys-smart
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 state:sur]
+$  card  card:agent:gall
++  multisig-factory-address  0x60e1.2446.3c54.105d.01d9.7f7b.84d5.3a49.e3fc.00a4.2c2d.4c80.7c85.2575.9d05.e4be
--
::
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
    =/  action  !<(action:sur vase)
    ?-    -.action
        %create
      :_  this
      ~
        %vote
      :_  this
      ~
        %propose
      :_  this
      ~
        %add-member
      :_  this
      ~
        %remove-member
      :_  this
      ~
      :: =/  create-fund-poke
      ::   :*
      ::   %pass  /fund-response  %agent  [our.bowl %uqbar]  %poke
      ::   %wallet-poke  !>
      ::   :*
      ::     %transaction
      ::     [~ [%collective /fund-response]]
      ::     wallet.action
      ::     fund-contract-address
      ::     0x0
      ::     [%noun [%create name.action wallet.action ship.action members.action]]
      ::   ==
      ::   ==
      :: :~
      ::   create-multisig
      :: ==
    ==
  ==
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def  
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  test  13
--
