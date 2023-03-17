/-  sur=multisig, groups, zig-wallet, indexer=zig-indexer
/+  default-agent, dbug,  smart=zig-sys-smart
/=  factory-lib  /con/collective/lib/multisig-factory
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 state:sur]
+$  card  card:agent:gall
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
  :: subscribing to be notified whenever the uqbar's state changes
  :~
    :*
    %pass   /multisig-indexer
    %agent  [our.bowl %uqbar]
    %watch  /indexer/multisig/batch-order/0x0
    ==
  ==
  this

++  on-save
  ^-  vase
  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
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
      =/  new-state  (~(put by multisigs) id [%.n name.action ~ 0 ~ ~ ~])
      :_  this(multisigs new-state)
      :~
          :*
          %pass   /thread/[ta-now] 
          %agent  [our.bowl %spider]  
          %poke   %spider-start  !>(start-args)
          ==
        [%give %fact ~[/client] %multisig-update !>(`update:sur`client+multisigs)]
      ==
        %vote
      :_  this
      ~
        %propose
      =/  proposal
      =+  [%noun [%propose (multisig-data id.action) calls.action]]
      :: =+  [%noun [%propose (multisig-data id.action) 123.456]]
      :: =+  [%noun [%propose (multisig-data id.action) ~]]
      =+  [%transaction origin proposer.action (multisig-pact id.action) 0x0 -]
      :*
      %pass   /multisig
      %agent  [our.bowl %uqbar]  
      %poke   %wallet-poke  !>(-)
      ==
      ~&  proposal
      :_  this
      ~[proposal]
      :: proposals
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
      =+  (~(urn by multisigs) scry-indexer:hc)
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
++  origin  [~ [%dev /dev]]
+$  multisig-state
  $:  members=(set address:smart)
      threshold=@ud
      executed=(list @ux)
      pending=(map @ux proposal:sur)
  ==
+$  holder-item-item-mold  [? [@ source=@ux @ @ [* * noun=*]]]
+$  holder-item-mold  (list [* * item=holder-item-item-mold])
+$  holder-mold  [* (map account=@ux holder-item-mold)]
++  multisig-pact  
  |=  =id:smart
  (hash-pact:smart 0x0 id 0x0 multisig-nock:factory-lib)
++  multisig-data  
  |=  =id:smart
  (hash-data:smart (multisig-pact id) (multisig-pact id) 0x0 0)
++  scry-indexer
  |=  [=id:smart =multisig:sur]
  ^-  multisig:sur
  ~&  'scry indexer called!!!!!!!!!!!!!'
  =/  holder-scry
    .^  update:indexer
      %gx
      (scot %p our.bowl)
      %indexer
      (scot %da now.bowl)
      %newest
      %holder
      (scot %ux 0x0)
      (scot %ux (multisig-pact id))
      %noun
      ~
      ==
  =/  item-scry
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
  ?.  ?&
        ?!(=(item-scry ~))
        ?=(%newest-item -.item-scry)
        ?=(%& -.item.item-scry)
      ==
    multisig
  ?>  ?=(%newest-item -.item-scry)
  ?>  ?=(%& -.item.item-scry)
  =/  item  (husk:smart multisig-state item.item-scry ~ ~)
  ~&  '-----------------'
  :: ~&  (multisig-data id)
  :: ~&  (multisig-pact id)
  :: ~&  item-scry
  ::  
  :: =/  assets  ~(tap by +.holder-scry)
  ?>  ?=(%item -.holder-scry)
  =/  holder-scry  `holder-mold`holder-scry
  =/  assets  (~(run by +.holder-scry) asset-from-item)
  =/  assets  (~(del by assets) (multisig-data id))
  :: ~&  holder-scry
  ~&  assets
  ~&  '-----------------'

  :*
    %.y
    name.multisig
    members.noun.item
    threshold.noun.item
    executed.noun.item
    pending.noun.item
    assets
  ==

++  asset-from-item
  |=  holder-item=holder-item-mold
  ^-  @ud
  =/  item  `[* * item=holder-item-item-mold]`-.holder-item
  ?:  ?&
          ?=(@ud -.noun.item.item)
          ?|  =(source.item.item 0x74.6361.7274.6e6f.632d.7367.697a)
              :: TODO add fungible contract here
              :: =(source.item.item 0x74.6361.7274.6e6f.632d.7367.697a)
          ==
      ==
    `@ud`-.noun.item.item
  0
--
