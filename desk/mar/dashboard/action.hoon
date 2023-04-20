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
    :~  [%sync (ot ~[id+so dashboard+(ot ~[portals+dejs-portals]) delete+bo])]
    ==
  --
++  grad  %noun

++  dejs-coordinates
  =,  dejs:format
      %-  ot
      ~[x+ni y+ni w+ni h+ni]
++  dejs-attributes
  =,  dejs:format
      %-  om
      so
++  dejs-portals
  =,  dejs:format
      %-  om
      %-  ot
      ~[component+so bundle+so coordinates+dejs-coordinates attributes+(om so)]
--
