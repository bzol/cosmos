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
    :~  [%sync (ot ~[id+so dashboard+(ot ~[widgets+dejs-widgets]) delete+bo])]
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
++  dejs-widgets
  =,  dejs:format
      %-  om
      %-  ot
      ~[type+so coordinates+dejs-coordinates attributes+(om so)]
--
