|%
+$  id  @t
+$  value  @t
+$  type  @tas

+$  attributes    (map =id =value)
+$  coordinates   [x1=@rd y1=@rd x2=@rd y2=@rd]
+$  desks         (set @t)
+$  portal        [component=type =coordinates =attributes]
+$  portals       (map id portal)
+$  dimensions    (map id portals)
::
+$  action
  $%
    [%sync =id portals=(list [id portal]) delete=?]
  ==
+$  update
  $%
    [%client =dimensions]
  ==
--
