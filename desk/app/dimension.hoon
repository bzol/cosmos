/-  sur=dimension
/+  default-agent, dbug
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 =dimensions:sur]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
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
      %dimension-action
    =/  action  !<(action:sur vase)
    ?-    -.action
        %sync  
      =+  ?.  delete.action
            (~(put by dimensions) id.action (malt portals.action))
          (~(del by dimensions) id.action)
      :_  this(dimensions -)
      :~  [%give %fact ~[/client] %dimension-update !>(`update:sur`client+-)]
      ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%client ~]
    :_  this
    :~  [%give %fact ~[/client] %dimension-update !>(`update:sur`client+dimensions)]
    ==
  ==
::
++  on-leave  on-leave:def
++  on-peek   
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
      [%x %dimensions ~]  
      :^  ~  ~  %dimension-update
      !>  ^-  update:sur
      [%client dimensions]
  ==
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
