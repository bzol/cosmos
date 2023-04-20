|%
+$  id  @t
+$  value  @t
+$  type  @tas

+$  attributes    (map =id =value)
+$  coordinates   [x=@ud y=@ud w=@ud h=@ud]
+$  portal        [bundle=type component=type =coordinates =attributes]
+$  portals       (map id portal)
+$  dashboard     portals
::
+$  dashboards    (map id dashboard)
::
+$  action
  $%
    [%sync =id =dashboard delete=?]
  ==
+$  update
  $%
    [%client =dashboards]
  ==
--
