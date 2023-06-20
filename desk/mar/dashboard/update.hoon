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
      |=  [=id:dash =portals:dash]
      %-  pairs:enjs:format
      :~
        ['id' %s id]
        ['portals' %a (enjs-dashboard portals)]
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
      ['x1' [%s (scot %rd x1.coordinates.portal)]]
      ['y1' [%s (scot %rd y1.coordinates.portal)]]
      ['x2' [%s (scot %rd x2.coordinates.portal)]]
      ['y2' [%s (scot %rd y2.coordinates.portal)]]
    ==
    :+  'attributes'
      %o
    %-  malt
    %+  turn  ~(tap by attributes.portal)
    |=  [=id:dash =value:dash]
    [id %s value]
  ==
--
