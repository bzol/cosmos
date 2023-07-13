|%
+$  id  @t
+$  value  @t
+$  type  @t

+$  attributes    (map =id =value)
+$  coordinates   [x1=@rd y1=@rd x2=@rd y2=@rd]
+$  desks         (set @tas)
+$  portal        [desk=@t component=type =coordinates =attributes]
+$  portals       (map id portal)
+$  dimensions    (map id portals)

:: +$  portals       (map id portal)
:: +$  dimension     [type=?(%standalone %group) =portals]
:: +$  dimensions    (map id dimension)
::
+$  action
  $%
    [%sync =id portals=(list [id portal]) delete=?]
    [%set-desk desk=@tas delete=?]
  ==
+$  update
  $%
    [%client =dimensions]
    [%desks =desks]
  ==
--
