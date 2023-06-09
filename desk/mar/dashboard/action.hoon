/-  *dashboard
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
      ~[x1+ni y1+ni x2+ni y2+ni]
++  dejs-attributes
  =,  dejs:format
      %-  om
      so
++  dejs-portals
  =,  dejs:format
      %-  ar
      %-  ot
      ~[id+so component+so bundle+so coordinates+dejs-coordinates attributes+(om so)]
--
