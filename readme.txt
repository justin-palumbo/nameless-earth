instructions:

informed by Dan and http://net.tutsplus.com/tutorials/php/quick-tip-deploy-php-to-heroku-in-seconds/

the folder this is in, heroku_use serves a git repo
to add new files use git add .
to commit more stuff use git commit -am "a message"
to push the committed version to heroku, use git push heroku master

the app is called nameless-earth-6366
so results show up on http://nameless-earth-6366.herokuapp.com
(browser loads up index.php, but can access others files via /file.ext as usual)


to put it on github
git remote add origin https://github.com/justinpa/reponame  (ie ..github.com/justin-palumbo/nameless-earth
git push

i am using heroku add on cleardb, so as to use mysql

Username:	b45cfe831c8530
Password:	f1fdb272
CLEARDB_DATABASE_URL: mysql://b45cfe831c8530:f1fdb272@us-cdbr-east-03.cleardb.com/heroku_3177567c389039e?reconnect=true