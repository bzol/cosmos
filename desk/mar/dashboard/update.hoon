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
        ['widgets' %a (enjs-dashboard dashboard)]
      ==
  --
++  grad  %noun
++  enjs-dashboard  
  |=  =widgets:dash
  %+  turn  ~(tap by widgets)
  |=  [=id:dash =widget:dash]
  %-  pairs:enjs:format
  :~
    ['id' %s id]
    ['type' %s type.widget]
    :+  'coordinates'
      %o
    %-  malt
    :~
      ['x' (numb:enjs:format x.coordinates.widget)]
      ['y' (numb:enjs:format y.coordinates.widget)]
      ['w' (numb:enjs:format w.coordinates.widget)]
      ['h' (numb:enjs:format h.coordinates.widget)]
    ==
    :+  'attributes'
      %o
    %-  malt
    %+  turn  ~(tap by attributes.widget)
    |=  [=id:dash =value:dash]
    [id %s value]
  ==
--
