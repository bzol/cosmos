/-  *mill
/+  *zink-zink, smart=zig-sys-smart, ethereum, merk
|_  [library=vase zink-cax=(map * @) test-mode=?]
::
++  verify-sig
  |=  =egg:smart
  ^-  ?
  =/  hash=@
    ?~  eth-hash.shell.egg
      (sham [shell yolk]:egg)
    u.eth-hash.shell.egg
  =?  v.sig.egg  (gte v.sig.egg 27)  (sub v.sig.egg 27)
  .=  id.from.shell.egg
  %-  address-from-pub:key:ethereum
  %-  serialize-point:secp256k1:secp:crypto
  %+  ecdsa-raw-recover:secp256k1:secp:crypto
  hash  sig.egg
::
++  shut                                               ::  slam a door
  |=  [dor=vase arm=@tas dor-sam=vase arm-sam=vase]
  ^-  vase
  %+  slap
    (slop dor (slop dor-sam arm-sam))
  ^-  hoon
  :-  %cnsg
  :^    [%$ ~]
      [%cnsg [arm ~] [%$ 2] [%$ 6] ~]  ::  replace sample
    [%$ 7]
  ~
::
++  ajar                                               ::  partial shut
  |=  [dor=vase arm=@tas dor-sam=vase arm-sam=vase]
  ^-  (pair)
  =/  typ=type
    [%cell p.dor [%cell p.dor-sam p.arm-sam]]
  =/  gen=hoon
    :-  %cnsg
    :^    [%$ ~]
        [%cnsg [arm ~] [%$ 2] [%$ 6] ~]
      [%$ 7]
    ~
  =/  gun  (~(mint ut typ) %noun gen)
  [[q.dor [q.dor-sam q.arm-sam]] q.gun]
::
++  mill
  |_  [miller=caller:smart town-id=id:smart batch=@ud]
  ::
  ::  +mill-all
  ::
  ::  All calls must be run through mill in parallel -- they should all operate against
  ::  the same starting state passed through `land` at the beginning. Each run of mill
  ::  should create a (validated) diff set, which can then be compared with an
  ::  accumulated set of diffs. If there is overlap, that call should be discarded or
  ::  pushed into the next parallel "pass", depending on sequencer parameters.
  ::
  ++  mill-all
    |=  [=land =basket passes=@ud]
    ^-  [state-transition rejected=carton]
    |^
    ::
    =/  pending
      ::  sort in REVERSE since each pass will reconstruct by appending
      ::  rejected to front, so need to +flop before each pass
      %+  sort  ~(tap in basket)
      |=  [a=[@ux =egg:smart] b=[@ux =egg:smart]]
      ::  sort by rate, unless caller is same, in which case order by nonce
      ?:  =(id.from.shell.egg.a id.from.shell.egg.b)
        (gth nonce.from.shell.egg.a nonce.from.shell.egg.b)
      (lth rate.shell.egg.a rate.shell.egg.b)
    ::
    =|  final=state-transition
    =|  reward=@ud
    |-
    ?:  ?|  ?=(~ pending)
            =(0 passes)
        ==
      ::  create final state transition
      ::  mark any remaining eggs as rejected
      :-  final(land land)
      %+  turn  pending
      |=  [h=@ux =egg:smart]
      [h egg(status.shell %9)]
    ::  otherwise, perform a pass
    =/  [passed=state-transition rejected=carton]
      (pass land (flop pending))
    %=  $
      land             land.passed
      pending          rejected
      processed.final  (weld processed.passed processed.final)
      hits.final       (weld hits.passed hits.final)
      diff.final       (uni:big diff.final diff.passed)
      crows.final      (weld crows.passed crows.final)
      burns.final      (uni:big burns.final burns.passed)
    ==
    ::
    ++  pass
      |=  [=^land pending=carton]
      ^-  [state-transition rejected=carton]
      =|  callers=(set id:smart)  ::  so that we immediately send repeat callers to next pass
      =|  processed=carton
      =|  rejected=carton
      =|  all-diffs=granary
      =|  lis-hits=(list (list hints))
      =|  crows=(list crow:smart)
      =|  all-burns=granary
      =|  reward=@ud
      |-  ::  TODO: make this a +turn
      ?~  pending
        :_  rejected
        :*  [(~(pay tax (uni:big p.land all-diffs)) reward) q.land]
            processed
            (flop lis-hits)
            all-diffs
            crows
            all-burns
        ==
      ::
      =/  caller-id  id.from.shell.egg.i.pending
      ?:  (~(has in callers) caller-id)
        %=  $
          pending   t.pending
          rejected  [i.pending rejected]
        ==
      ::
      =/  [fee=@ud [diff=granary nonces=populace] burned=granary =errorcode:smart hits=(list hints) =crow:smart]
        (mill land egg.i.pending)
      =/  diff-and-burned  (uni:big diff burned)
      ?.  ?&  ?=(~ (int:big all-diffs diff-and-burned))
              ?=(~ (int:big all-burns diff-and-burned))
          ==
        ?.  =(%0 errorcode)
          ::  invalid egg -- do not send to next pass,
          ::  but do increment nonce
          %=  $
            pending    t.pending
            processed  [i.pending(status.shell.egg errorcode) processed]
            q.land     nonces
            callers    (~(put in callers) caller-id)
            reward     (add reward fee)
            lis-hits   [hits lis-hits]
          ==
        ::  valid, but diff or burned contains collision. re-mill in next pass
        ::
        %=  $
          pending   t.pending
          rejected  [i.pending rejected]
        ==
      ::  diff is isolated, proceed
      ::  increment nonce
      ::
      %=  $
        pending    t.pending
        processed  [i.pending(status.shell.egg errorcode) processed]
        q.land     nonces
        reward     (add reward fee)
        lis-hits   [hits lis-hits]
        crows      [crow crows]
        callers    (~(put in callers) caller-id)
        all-diffs  (uni:big all-diffs diff)
        all-burns  (uni:big all-burns burned)
      ==
    --
  ::
  ::  +mill: processes a single egg and returns map of modified grains + updated nonce
  ::
  ++  mill
    |=  [=land =egg:smart]
    ^-  [fee=@ud ^land burned=granary =errorcode:smart hits=(list hints) =crow:smart]
    ::  validate transaction signature
    ?.  ?:(!test-mode (verify-sig egg) %.y)
      ~&  >>>  "mill: signature mismatch"
      [0 [~ q.land] ~ %2 ~ ~]  ::  signed tx doesn't match account
    ::
    =/  expected-nonce  +((gut:pig q.land id.from.shell.egg 0))
    ?.  =(nonce.from.shell.egg expected-nonce)
      ~&  >>>  "mill: expected nonce={<expected-nonce>}, got {<nonce.from.shell.egg>}"
      [0 [~ q.land] ~ %3 ~ ~]  ::  bad nonce
    ::
    ?.  (~(audit tax p.land) egg)
      ~&  >>>  "mill: tx rejected; account balance less than budget"
      [0 [~ q.land] ~ %4 ~ ~]  ::  can't afford gas
    ::
    =/  res      (~(work farm p.land) egg)
    =/  fee=@ud  (sub budget.shell.egg rem.res)
    :+  fee
      :_  (put:pig q.land id.from.shell.egg nonce.from.shell.egg)
      ::  charge gas fee by including their designated zigs grain inside the diff
      ?:  =(0 fee)  ~
      %+  put:big  (fall diff.res ~)
      (~(charge tax p.land) (fall diff.res ~) from.shell.egg fee)
    [burned errorcode hits crow]:res
  ::
  ::  +tax: manage payment for egg in zigs
  ::
  ++  tax
    |_  =granary
    +$  token-account
      $:  balance=@ud
          allowances=(map sender=id:smart @ud)
          metadata=id:smart
          nonce=@ud
      ==
    ::  +audit: evaluate whether a caller can afford gas,
    ::  and appropriately set budget for any zigs transactions
    ::  maximum possible charge is full budget * rate
    ++  audit
      |=  =egg:smart
      ^-  ?
      ?~  zigs=(get:big granary zigs.from.shell.egg)  %.n
      ?.  =(id.from.shell.egg holder.p.u.zigs)        %.n
      ?.  =(zigs-wheat-id:smart lord.p.u.zigs)        %.n
      ?.  ?=(%& -.u.zigs)                             %.n
      =/  balance  ;;(@ud -.data.p.u.zigs)
      (gte balance (mul budget.shell.egg rate.shell.egg))
    ::  +charge: extract gas fee from caller's zigs balance
    ::  returns a single modified grain to be inserted into a diff
    ::  cannot crash after audit, as long as zigs contract adequately
    ::  validates balance >= budget+amount.
    ++  charge
      |=  [diff=^granary payee=caller:smart fee=@ud]
      ^-  [id:smart grain:smart]
      =/  zigs=grain:smart
        ::  find grain in diff, or fall back to full state
        ::  got will never crash since +audit proved existence
        %^  gut:big  diff  zigs.payee
        (got:big granary zigs.payee)
      ?>  ?=(%& -.zigs)
      =/  balance  ;;(@ud -.data.p.zigs)
      =-  [zigs.payee zigs(data.p -)]
      [(sub balance fee) +.data.p.zigs]
    ::  +pay: give fees from eggs to miller
    ++  pay
      |=  total=@ud
      ^-  ^granary
      =/  acc=grain:smart
        %^  gut:big  granary  zigs.miller
        ::  create a new account rice for the sequencer if needed
        =/  =token-account  [total ~ `@ux`'zigs-metadata' 0]
        =/  =id:smart  (fry-rice:smart zigs-wheat-id:smart id.miller town-id `@`'zigs')
        [%& 'zigs' %account token-account id zigs-wheat-id:smart id.miller town-id]
      ?.  ?=(%& -.acc)  granary
      =/  account  ;;(token-account data.p.acc)
      ?.  =(`@ux`'zigs-metadata' metadata.account)  granary
      =.  balance.account  (add balance.account total)
      =.  data.p.acc  account
      (put:big granary id.p.acc acc)
    --
  ::
  ::  +farm: execute a call to a contract
  ::
  ++  farm
    |_  =granary
    ::  +work: take egg and return diff granary, remaining budget,
    ::  and errorcode (0=success)
    ++  work
      |=  =egg:smart
      ^-  hatchling
      =/  res  (incubate egg ~ ~)
      res(hits (flop hits.res))
    ::  +incubate: fertilize and germinate, then grow
    ++  incubate
      |=  [=egg:smart hits=(list hints) burned=^granary]
      ^-  hatchling
      =/  from  [id.from.shell.egg nonce.from.shell.egg]
      ::  check for grain burn transaction
      ?:  &(=(0x0 contract.shell.egg) =(%burn p.yolk.egg))
        (poach egg)
      ::  insert budget argument if egg is %give-ing zigs
      =?  q.yolk.egg  &(=(contract.shell.egg zigs-wheat-id:smart) =(p.yolk.egg %give))
        [budget.shell.egg q.yolk.egg]
      ?~  gra=(get:big granary contract.shell.egg)
        ::  can't find contract to call
        [~ ~ ~ ~ budget.shell.egg %5]
      ?.  ?=(%| -.u.gra)
        ::  contract id found a rice
        [~ ~ ~ ~ budget.shell.egg %5]
      (grow from p.u.gra egg hits burned)
    ::  +grow: recursively apply any calls stemming from egg,
    ::  return on rooster or failure
    ++  grow
      |=  [from=[=id:smart nonce=@ud] =wheat:smart =egg:smart hits=(list hints) burned=^granary]
      ^-  hatchling
      |^
      =+  [hit chick rem err]=(weed contract.shell.egg budget.shell.egg)
      ?~  chick  [hit^hits ~ ~ ~ rem err]
      ?:  ?=(%& -.u.chick)
        ::  rooster result, finished growing
        ?~  diff=(harvest p.u.chick contract.shell.egg from.shell.egg)
          ::  failed validation
          [hit^hits ~ ~ ~ rem %7]
        ::  harvest passed
        [hit^hits diff burned.p.u.chick crow.p.u.chick rem err]
      ::  hen result, continuation
      =|  crows=crow:smart
      =|  all-diffs=^granary
      =/  all-burns  burned.rooster.p.u.chick
      =*  next  next.p.u.chick
      =.  hits  hit^hits
      =/  last-diff  (harvest rooster.p.u.chick contract.shell.egg from.shell.egg)
      |-
      ?~  last-diff
        ::  diff from last call failed validation
        [hits ~ ~ ~ rem %7]
      =.  all-diffs  (uni:big all-diffs u.last-diff)
      ?~  next
        ::  all continuations complete
        [hits `all-diffs all-burns (weld crows crow.rooster.p.u.chick) rem %0]
      ::  continue continuing
      =/  inter
        %+  ~(incubate farm (dif:big (uni:big granary all-diffs) all-burns))
          %=  egg
            id.from.shell   contract.shell.egg
            contract.shell  contract.i.next
            budget.shell    rem
            yolk            yolk.i.next
          ==
        [hits all-burns]
      ?.  =(%0 errorcode.inter)
        [(weld hits.inter hits) ~ ~ ~ rem.inter errorcode.inter]
      %=  $
        next       t.next
        rem        rem.inter
        last-diff  diff.inter
        all-burns  (uni:big all-burns burned.inter)
        hits       (weld hits.inter hits)
        crows      (weld crows crow.inter)
      ==
      ::
      ::  +weed: run contract formula with arguments and memory, bounded by bud
      ::
      ++  weed
        |=  [to=id:smart budget=@ud]
        ^-  [hints (unit chick:smart) rem=@ud =errorcode:smart]
        ~>  %bout
        ?~  cont.wheat   [~ ~ budget %6]
        =/  =cart:smart  [to from batch town-id]
        =/  payload   .*(q.library pay.u.cont.wheat)
        =/  cor       .*([q.library payload] bat.u.cont.wheat)
        =/  dor=vase  [-:!>(*contract:smart) cor]
        =/  gun  (ajar dor %write !>(cart) !>(yolk.egg))
        ::
        ::  generate ZK-proof hints with zebra
        ::
        =/  =book
          (zebra budget zink-cax search gun test-mode)
        :-  hit.q.book
        ?:  ?=(%| -.p.book)
          ::  error in contract execution
          ~&  >>>  p.book
          [~ bud.q.book %6]
        ::  chick result
        ?~  p.p.book
          ~&  >>>  "mill: ran out of gas"
          [~ 0 %8]
        [;;((unit chick:smart) p.p.book) bud.q.book %0]
      ::
      ++  search
        |=  pat=^
        ^-  (unit [path=(list phash) product=*])
        ?.  ?=([%0 %granary @ ~] +.pat)   ~
        ?~  id=(slaw %ux -.+.+.+.pat)     ~
        ~&  >>  "looking for grain: {<`@ux`u.id>}"
        ?~  grain=(get:big granary u.id)
          ~&  >>>  "didn't find it"  ~
        ::  TODO populate path using +mek in merk
        `[(mek:big granary u.id) u.grain]
      --
    ::
    ::  +harvest: take a completed execution and validate all changes
    ::  and additions to granary state
    ::
    ++  harvest
      |=  [res=rooster:smart lord=id:smart from=caller:smart]
      ^-  (unit ^granary)
      =-  ?.  -
            ~&  >>>  "harvest checks failed"
            ~
          `(uni:big changed.res issued.res)
      ?&  %-  ~(all in changed.res)
          |=  [=id:smart @ =grain:smart]
          ::  all changed grains must already exist AND
          ::  new grain must be same type as old grain AND
          ::  id in changed map must be equal to id in grain AND
          ::  if rice, salt must not change AND
          ::  only grains that proclaim us lord may be changed
          =/  old  (get:big granary id)
          ?&  ?=(^ old)
              ?:  ?=(%& -.u.old)
                &(?=(%& -.grain) =(salt.p.u.old salt.p.grain))
              =(%| -.grain)
              =(id id.p.grain)
              =(lord.p.grain lord.p.u.old)
              =(lord lord.p.u.old)
          ==
        ::
          %-  ~(all in issued.res)
          |=  [=id:smart @ =grain:smart]
          ::  id in issued map must be equal to id in grain AND
          ::  lord of grain must either be contract issuing it or 0x0 AND
          ::  grain must not yet exist at that id AND
          ::  grain IDs must match defined hashing functions
          ?&  =(id id.p.grain)
              |(=(lord lord.p.grain) =(0x0 lord.p.grain))
              !(has:big granary id.p.grain)
              ?:  ?=(%| -.grain)
                =(id (fry-wheat:smart lord.p.grain holder.p.grain town-id.p.grain cont.p.grain))
              =(id (fry-rice:smart lord holder.p.grain town-id.p.grain salt.p.grain))
          ==
        ::
          %-  ~(all in burned.res)
          |=  [=id:smart @ =grain:smart]
          ::  all burned grains must already exist AND
          ::  id in burned map must be equal to id in grain AND
          ::  no burned grains may also have been changed at same time AND
          ::  only grains that proclaim us lord may be burned AND
          ::  burned cannot contain grain used to pay for gas
          ::
          ::  NOTE: you *can* modify a grain in-contract before burning it.
          ::  the town-id of a burned grain marks the town which can REDEEM it.
          ::
          =/  old  (get:big granary id)
          ?&  ?=(^ old)
              =(id id.p.grain)
              !(has:big changed.res id)
              =(lord.p.grain lord.p.u.old)
              =(lord lord.p.u.old)
              !=(zigs.from id)
          ==
      ==
    ::
    ::  +poach: handle special burn-only transactions, used for manually
    ::  escaping some grain from a town. must be EITHER holder or lord to burn.
    ::
    ++  poach
      |=  =egg:smart
      ^-  hatchling
      ::  TODO provide new error codes for these things
      ::  TODO assign reasonable fixed cost for a burn
      =/  fixed-burn-cost  1.000
      ::  charge fixed cost for failed transactions too
      ::  TODO should do this everywhere that we can inside +farm
      =/  fail  [~ ~ ~ ~ (sub budget.shell.egg fixed-burn-cost) %6]
      ::  argument for %burn must be a grain ID
      ?.  ?=([id=@ux town=@ux] q.yolk.egg)          fail
      ::  grain must exist in granary
      ?~  to-burn=(get:big granary id.q.yolk.egg)   fail
      ::  town ID must be different from current town
      ?:  =(town.q.yolk.egg town-id.p.u.to-burn)    fail
      ::  caller must be lord OR holder
      ?.  ?|  =(lord.p.u.to-burn id.from.shell.egg)
              =(holder.p.u.to-burn id.from.shell.egg)
          ==
        fail
      ::  produce hatchling
      :*  ~  ~
          (gas:big *^granary ~[[id.p.u.to-burn u.to-burn]])
          ~[[%burn `json`[%s (scot %ux id.p.u.to-burn)]]]
          (sub budget.shell.egg fixed-burn-cost)
          %0
      ==
    --
  --
--
