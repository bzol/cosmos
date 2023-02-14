/-  msig=multisig
|_  =update:msig
++  grab
  |%
  ++  noun  update:msig
  --
++  grow
  |%
  ++  noun  update
  ++  json  
    ~&  update
    :: [%s 'hello']
      :-  %a  
      %+  turn  ~(tap by multisigs:update)
      |=  [=id:msig =multisig:msig]
      :: ~&  multisig
      %-  pairs:enjs:format
      :~
        ['id' %s (scot %ux id)]
        ['init' %b init.multisig]
        ['name' %s name.multisig]
        ['threshold' %n (scot %ud threshold.multisig)]
      ::   :: ['creator' (pairs:enjs:format ~[['address' %s (scot %ux wallet.creator.collective)] ['ship' %s (scot %p ship.creator.collective)]])]
        :*
          'members'
          %a
          %+  turn  ~(tap in members.multisig)
          |=  address=@ux 
          [%s (scot %ux address)]
      ::     :: %-  pairs:enjs:format
      ::     :: :~
      ::     ::   ['address' %s (scot %ux address)]
        ==
      ==
      ::   :: ['assets' %a ~]
  --
++  grad  %noun
--
