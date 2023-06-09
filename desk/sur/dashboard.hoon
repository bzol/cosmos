|%
+$  id  @t
+$  value  @t
+$  type  @tas

+$  attributes    (map =id =value)
+$  coordinates   [x1=@ud y1=@ud x2=@ud y2=@ud]
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
