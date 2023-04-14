/+  conq=zink-conq
|%
++  contract-head
'''
/+  *zig-sys-smart
|_  =context
'''
++  contract-actions
'''

+$  modules  (pset [type=@tas address])
+$  action
  $%  ::  called once to initialize core
      [%create ?]

'''
++  action1  
'''
      [%create-dao members=(pset address)]
'''
++  contract-body  
'''
  ==
++  write
  |=  act=action
  ^-  (quip call diff)
  ~>  %hello
  ~>  %hello2
  ~>  %hello3
  ?:  ?=(%create -.act)
    =/  =id  (hash-data this.context this.context town.context 0)
    =/  =item
      :*  %&  id
          this.context
          this.context
          town.context
          0
          %core  ~
      ==
    `(result ~ item^~ ~ ~)
  =+  (need (scry-state (hash-data this.context this.context town.context 0)))
  =/  core-data  (husk modules - `this.context ~)
  ?-    -.act
'''
++  action2
'''
      %create-dao
    `(result ~ ~ ~ ~)
'''
++  contract-tail  
'''
  ==
::
++  read
  |_  =path
    ++  json
      ~
    ++  noun
      ~
    --
--
'''

++  ditto
  |=  file=tape
  (find ~['\'' '\'' '\''] file)
::
++  extract-input
  |=  action=path
  =/  file  (trip .^(@t %cx action))
  =/  start  (ditto file)
  =/  end    (ditto (oust [0 (add 3 +.start)] file))
  (swag [(add 3 +.start) +.end] file)
++  extract-body
  |=  action=path
  =/  file  (trip .^(@t %cx action))
  :: =/  start  (oust [0 (find "body" file)] file)
  =/  body  (find "body" file)
  =/  quot  (ditto (oust [0 +.body] file))
  =/  start  (add 3 (add +.quot +.body))
  =/  end  (ditto (oust [0 start] file))
  (swag [start +.end] file)
++  extract-module
  |=  module=path
  =/  file  (trip .^(@t %cx module))
  (oust [0 2] (snip (snip (snip file))))

  :: =/  end    (ditto (oust [0 (add 3 +.start)] file))
  :: (swag [(add 3 +.start) +.end] file)
++  glue  
  |=  tapes=(list tape)
  ^-  tape
  =+  (spin tapes "" |=([n=tape a=tape] [n (weld n a)]))
  +.-
++  assemble
  |=  [actions=(list path)]
  =/  glued  (glue (turn actions extract-input))
  %-  compile-contract:conq
  :-  /collective
  %-  crip
  %+  weld  (trip contract-head)
  :: %+  weld  (trip (crip (glue (turn modules extract-module))))
  %+  weld  (trip contract-actions)
  %+  weld  (trip (crip (glue (turn actions extract-input))))
  %+  weld  (trip contract-body)
  %+  weld  (trip (crip (glue (turn actions extract-body))))
  (trip contract-tail)
--



