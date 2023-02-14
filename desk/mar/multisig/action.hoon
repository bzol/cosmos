/-  *multisig
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
    :~  [%create (ot ~[from+(se %ux) name+so threshold+ni members+[(as (se %ux))]])]
    ==
  --
++  grad  %noun

++  dejs-members
  =,  dejs:format
  %-  ar
  %-  ot
  ~[address+(se %ux) ship+(se %p)]
--
