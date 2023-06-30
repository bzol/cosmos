/-  *dimension
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
    :~  [%sync (ot ~[id+so portals+dejs-portals delete+bo])]
    ==
  --
++  grad  %noun

++  dejs-coordinates
  =,  dejs:format
      %-  ot
      ~[x1+ne y1+ne x2+ne y2+ne]
++  dejs-attributes
  =,  dejs:format
      %-  om
      so
++  dejs-portals
  =,  dejs:format
      %-  ar
      %-  ot
      ~[id+so desk+so component+so coordinates+dejs-coordinates attributes+(om so)]
--

