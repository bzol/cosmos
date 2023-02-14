/-  sur=multisig, groups, zig-wallet, indexer=zig-indexer
/+  default-agent, dbug,  smart=zig-sys-smart
/=  factory-lib  /con/collective/lib/multisig-factory
/=  multilib  /con/lib/multisig
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
  :~
    :*
    %pass   /multisig-indexer
    %agent  [our.bowl %uqbar] 
    %watch  /indexer/multisig/batch-order/0x0
    ==
  ==
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
      %wallet-update
    =/  w  !<(wallet-update:zig-wallet vase)
    ?+    -.w  !!
        %finished-transaction
        ~&  w
        [~ this]
    ==
      %multisig-action
    =/  action  !<(action:sur vase)
    ?-    -.action
        %create
      =/  id  `@ux`eny.bowl
      =/  tid  `@ta`(cat 3 'thread_' (scot %uv (sham eny.bowl)))
      =/  thread-input  [id from.action threshold.action members.action]
      =/  start-args  
      [~ `tid byk.bowl(r da+now.bowl) %multisig !>(thread-input)]
      =/  ta-now  `@ta`(scot %da now.bowl)
      =/  new-state  (~(put by multisigs) id [%.n name.action ~ 0 ~ ~])
      :_  this(multisigs new-state)
      :~
          :*
          %pass   /thread/[ta-now] 
          %agent  [our.bowl %spider]  
          %poke   %spider-start  !>(start-args)
          ==
        [%give %fact ~[/client] %multisig-update !>(`update:sur`client+multisigs)]
      ==
        :: %vote
      :: :_  this
      :: ~
        :: %propose
      :: :_  this
      :: ~
        :: %add-member
      :: :_  this
      :: ~
        :: %remove-member
      :: :_  this
      :: ~
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%client ~]
    :_  this
    :~  [%give %fact ~[/client] %multisig-update !>(`update:sur`client+multisigs)]
    ==
  ==
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ~&  'on-agent happened!!!!!!!!!!!!!!!!'

  ?+    wire  (on-agent:def wire sign)
      [%multisig-indexer ~]
    ?+    -.sign  (on-agent:def wire sign)
        %kick
      ~&  'kick happened!!!!!!!'
      :_  this
      :~  
      [%pass /multisig-indexer %agent [our.bowl %uqbar] %watch /indexer/multisig/batch-order/0x0]


      ==
        %fact
      ~&  'fact happened!!!!!!!'
      =+  (~(urn by multisigs) scry-item:hc)
      :_  this(multisigs -)
      :~  [%give %fact ~[/client] %multisig-update !>(`update:sur`client+multisigs)]
      ==
    ==
      :: ?+    p.cage.sign  (on-agent:def wire sign)
          :: %todo-update
        :: ~&  !<(update:todo q.cage.sign)
    :: ~&  (~(urn by multisigs) |=([k=@ v=@] 13))
    :: ~&  multisigs
    :: ~&  -
    :: ?+    -.sign  (on-agent:def wire sign)
    ::     %watch-ack
    ::   `this
    ::     %kick
    ::   `this
    ::     %fact
    ::   `this
    :: ==
  ::
  ==
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  multisig-pact  
  |=  =id:smart
  (hash-pact:smart 0x0 id 0x0 multisig-nock:factory-lib)
++  multisig-data  
  |=  =id:smart
  (hash-data:smart (multisig-pact id) (multisig-pact id) 0x0 0)
++  scry-item
  |=  [=id:smart =multisig:sur]
  =/  update
    .^  update:indexer
      %gx
      (scot %p our.bowl)
      %indexer
      (scot %da now.bowl)
      %newest
      %item
      (scot %ux 0x0)
      (scot %ux (multisig-data id))
      %noun
      ~
      ==
  ~&  '-----------------'
  ~&  update
  ~&  '-----------------'
  ?.  ?&  
        ?!(=(update ~))
        ?=(%newest-item -.update)
        ?=(%& -.item.update)
      ==
    multisig
  ?>  ?=(%newest-item -.update)
  ?>  ?=(%& -.item.update)
  ~&  item.update
  :: =/  item  (husk:smart multisig-state:sur:multilib item.update ~ ~)
  :: =/  new-multisig
  :: :*
  ::   %.y
  ::   members.noun.item
  ::   threshold.noun.item
  ::   executed.noun.item
  ::   pending.noun.item
  :: ==
  =/  new-multisig
  :*
    %.y
    +>.item.update
    0
    ~
    ~
  ==
  ~&  new-multisig
  multisig
--
