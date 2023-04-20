/-  dash=dashboard
|_  =update:dash
++  grab
  |%
  ++  noun  update:dash
  --
++  grow
  |%
  ++  noun  update
  ++  json  
      :-  %a  
      %+  turn  ~(tap by dashboards:update)
      |=  [=id:dash =dashboard:dash]
      %-  pairs:enjs:format
      :~
        ['id' %s id]
        ['portals' %a (enjs-dashboard dashboard)]
      ==
  --
++  grad  %noun
++  enjs-dashboard  
  |=  =portals:dash
  %+  turn  ~(tap by portals)
  |=  [=id:dash =portal:dash]
  %-  pairs:enjs:format
  :~
    ['id' %s id]
    ['component' %s component.portal]
    ['bundle' %s bundle.portal]
    :+  'coordinates'
      %o
    %-  malt
    :~
      ['x' (numb:enjs:format x.coordinates.portal)]
      ['y' (numb:enjs:format y.coordinates.portal)]
      ['w' (numb:enjs:format w.coordinates.portal)]
      ['h' (numb:enjs:format h.coordinates.portal)]
    ==
    :+  'attributes'
      %o
    %-  malt
    %+  turn  ~(tap by attributes.portal)
    |=  [=id:dash =value:dash]
    [id %s value]
  ==
--
