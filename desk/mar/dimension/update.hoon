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
    ?-  -.update
      %client
    (enjs-dimensions dimensions:update)
      %desks
    (enjs-desks desks:update)
    ==
  --
++  grad  %noun
::
++  enjs-desks
  |=  =desks:dim
  :-  %a
  %+  turn  ~(tap in desks)
  |=  desk=@tas
  [%s desk]
++  enjs-dimensions
  |=  =dimensions:dim
  :-  %a
  %+  turn  ~(tap by dimensions)
  |=  [=id:dim =portals:dim]
  %-  pairs:enjs:format
  :~
    ['id' %s id]
    ['portals' %a (enjs-dimension portals)]
  ==
++  enjs-dimension  
  |=  =portals:dim
  %+  turn  ~(tap by portals)
  |=  [=id:dim =portal:dim]
  %-  pairs:enjs:format
  :~
    ['id' %s id]
    ['desk' %s desk.portal]
    ['component' %s component.portal]
    :+  'coordinates'
      %o
    %-  malt
    :~
      :: ['x1' [%n '0.13']]
      :: ['y1' [%n '0.13']]
      :: ['x2' [%n '0.13']]
      :: ['y2' [%n '0.13']]
      ['x1' [%n (crip (oust [15 15] (oust [0 2] (trip (scot %rd x1.coordinates.portal)))))]]
      ['y1' [%n (crip (oust [15 15] (oust [0 2] (trip (scot %rd y1.coordinates.portal)))))]]
      ['x2' [%n (crip (oust [15 15] (oust [0 2] (trip (scot %rd x2.coordinates.portal)))))]]
      ['y2' [%n (crip (oust [15 15] (oust [0 2] (trip (scot %rd y2.coordinates.portal)))))]]
    ==
    :+  'attributes'
      %o
    %-  malt
    %+  turn  ~(tap by attributes.portal)
    |=  [=id:dim =value:dim]
    [id %s value]
  ==
--
