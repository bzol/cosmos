|%
++  contract-head
'''
/+  *zig-sys-smart
:: /=  factory-lib  /lib/modules/member
|_  =context
+$  modules  (pset [type=@tas address])
+$  action
  $%  ::  called once to initialize multisig
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
  |=  module=path
  =/  file  (trip .^(@t %cx module))
  =/  start  (ditto file)
  =/  end    (ditto (oust [0 (add 3 +.start)] file))
  (swag [(add 3 +.start) +.end] file)
++  extract-body
  |=  module=path
  =/  file  (trip .^(@t %cx module))
  :: =/  start  (oust [0 (find "body" file)] file)
  =/  body  (find "body" file)
  =/  quot  (ditto (oust [0 +.body] file))
  =/  start  (add 3 (add +.quot +.body))
  =/  end  (ditto (oust [0 start] file))
  :: =/  end    (ditto (oust [0 (add 3 (add +.body +.start))] file))
  :: =/  start  (oust [0 +.-] file))
  :: -
  :: (oust [0 +.end] file)
  (swag [start +.end] file)
  :: (crip (swag [(add 3 +.start) (sub +.end 3)] file))

:: ++  test
::   |=  modules=(list path)
::   :: =/  test  (roll (turn modules extract-input) weld)
::   =/  test  (turn modules extract-input)
::   test
::   :: `(list @tD)`-.test
++  glue  
  |=  tapes=(list tape)
  ^-  tape
  =+  (spin tapes "" |=([n=tape a=tape] [n (weld n a)]))
  +.-
++  assemble
  |=  modules=(list path)
  :: =/  input-modules  (spin (limo ~["gfdgd" "gfdgdfg"]) "" |=([n=tape a=tape] [n (weld n a)]))
  =/  glued  (glue (turn modules extract-input))
  %-  crip
  %+  weld  (trip contract-head)
  %+  weld  (trip (crip (glue (turn modules extract-input))))
  %+  weld  (trip contract-body)
  %+  weld  (trip (crip (glue (turn modules extract-body))))
  (trip contract-tail)
--
