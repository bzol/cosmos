/-  *collective
|_  act=action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  action
  ++  json  
    =,  dejs:format
    |=  jon=json
    ^-  action
    ~&  jon
    %.  jon
    %-  of
    :~  [%create (ot ~[name+so wallet+(se %ux) ship+(se %p) members+(ar (ot ~[address+(se %ux) ship+(se %p)]))])]
    ==
  --
++  grad  %noun

++  dejs-members
  =,  dejs:format
  %-  ar
  %-  ot
  ~[address+(se %ux) ship+(se %p)]
  
:: ++  dejs-create  
::   =,  dejs:format
::   %-  ot  
::   :~
::     name+so
::     :: wallet+(se %ux)
::     :: ship+(se %p)
::     :: members+(ar (ot ~[address+(se %ux)] ship+(se %p)))
::   ==
--
