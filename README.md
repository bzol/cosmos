# Steps to Develop this

- clone the git repo
- mount a desk named %collective
- delete the %collective folder
- use `./install -w $URBIT_SHIP_DIRECTORY` inside your git repo to copy the desk to your urbit ship's folder
- copy base-dev folder to the %collective folder inside your urbit ship
- `|commit %collective` to commit the desk
- use `|install our %collective` to install the desk
- change the urbit configuration in declare.js to your ship's config (ship,url,code)
- start the frontend with `npm start` and click w to open start web frontend

- hope this helps :)
