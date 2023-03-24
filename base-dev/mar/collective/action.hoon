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
    :~  [%send-fungible (ot ~[multisig-id+(se %ux) amount+ni to+(se %ux) from-account+(se %ux) members+(ar (ot ~[address+(se %ux) ship+(se %p)]))])]
    ==
  --
++  grad  %noun

++  dejs-members
  =,  dejs:format
  %-  ar
  %-  ot
  ~[address+(se %ux) ship+(se %p)]
--
