/-  dim=dimension
|_  =update:dim
++  grab
  |%
  ++  noun  update:dim
  --
++  grow
  |%
  ++  noun  update
  ++  json  
      :-  %a  
      %+  turn  ~(tap by dimensions:update)
      |=  [=id:dim =portals:dim]
      %-  pairs:enjs:format
      :~
        ['id' %s id]
        ['portals' %a (enjs-dimension portals)]
      ==
  --
++  grad  %noun
++  enjs-dimension  
  |=  =portals:dim
  %+  turn  ~(tap by portals)
  |=  [=id:dim =portal:dim]
  %-  pairs:enjs:format
  :~
    ['id' %s id]
    ['component' %s component.portal]
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
    |=  [=id:dim =value:dim]
    [id %s value]
  ==
--
