/-  sur=dashboard
/+  default-agent, dbug
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 =dashboards:sur]
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
  ~&  'on-poke'
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %dashboard-action
    =/  action  !<(action:sur vase)
    ~&  'on-poke'
    ?-    -.action
        %sync  
      =+  ?.  delete.action
            (~(put by dashboards) id.action dashboard.action)
          (~(del by dashboards) id.action)
      :_  this(dashboards -)
      :~  [%give %fact ~[/client] %dashboard-update !>(`update:sur`client+-)]
      ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%client ~]
    :_  this
    :~  [%give %fact ~[/client] %dashboard-update !>(`update:sur`client+dashboards)]
    ==
  ==
::
++  on-leave  on-leave:def
++  on-peek   
  |=  =path
  ^-  (unit (unit cage))
  ~&  'hello there'
  ~&  path
  ?+    path  (on-peek:def path)
      [%x %dashboards ~]  
      ~&  'hello again'
      :^  ~  ~  %dashboard-update
      !>  ^-  update:sur
      [%client dashboards]
  ==
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::
