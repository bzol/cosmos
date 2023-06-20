|%
+$  id  @t
+$  value  @t
+$  type  @tas

+$  attributes    (map =id =value)
+$  coordinates   [x1=@rd y1=@rd x2=@rd y2=@rd]
+$  portal        [component=type bundle=type =coordinates =attributes]
+$  portals     (map id portal)
+$  dashboards    (map id portals)
::
+$  action
  $%
    [%sync =id portals=(list [id portal]) delete=?]
  ==
+$  update
  $%
    [%client =dashboards]
  ==
--
