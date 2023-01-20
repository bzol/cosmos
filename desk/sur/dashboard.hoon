|%
+$  id  @t
+$  value  @t
+$  type  @tas

+$  attributes    (map =id =value)
+$  coordinates   [x=@ud y=@ud w=@ud h=@ud]
+$  widget        [=type =coordinates =attributes]
+$  widgets       (map id widget)
+$  dashboard     widgets
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
