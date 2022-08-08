/******************************************* Load Environmental Variables */
require('dotenv').config()

/******************************************* Configure MySQL Connection */
let mysql      = require('mysql2');
const pool = mysql.createPool({
  host     : process.env.mysql_host,
  user     : process.env.mysql_user,
  password : process.env.mysql_password,
  database : process.env.mysql_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 
/******************************************* Configure Express/Server */
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.disable('etag'); //disables caching - TODO - remove this/find a way to disable only for api requests
const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'bucaneerSessionId',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: '14onpr2c124301f39oijf390f39j0f34u1h9iu149831h8913',
  cookie: { 
    //secure: true 
  }
}));

//Setup passport for authentication stuff later and tracking user now
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(async function (username, password, done) {
  try {
    if (username === 'MagicLink!!!!!!!!!!!!!!!!!!!!!') {
      
      const connection = pool.promise();

      let user = (await connection.query(`
        SELECT *
        FROM user 
        WHERE user_id = ${connection.escape(password)}
      `))[0][0];
      
      //If we found the user, great!
      if (user) {
        //Success - return the user
        done(null, user);
      } else {
        //Return our custom error message
        done(null, false, 'You are not authorized');
      }
    } else {
      //TODO - Implement username/password here or google oauth in a separate strategy, or both
    }
} catch (e) {
  //Return the unknown error
  done(e);
}
}));

app.use(passport.authenticate('session'));

//Serve client html from the client folder
app.use(express.static('client'))

/******************************************* User Login*/
app.post('/api/login', passport.authenticate('local', { failureMessage: true }), function(req, res) {
  res.send(req.session.passport.user);
});

/******************************************* Campaigns */
app.get('/api/user/:user_id/campaigns', getCampaigns);
app.get('/api/user/campaigns', getCampaigns);

async function getCampaigns (req, res) {
  try { 
    console.log(req.params.user_id || req.session.passport.user.user_id);
    const connection = pool.promise();

    let results = await connection.query(`
        SELECT 
        campaign.*
      FROM campaign 
        INNER JOIN user_campaign ON (user_campaign_id)
        INNER JOIN user USING (user_id)
      WHERE campaign.campaign_id = ${connection.escape(req.params.user_id || req.session.passport.user.user_id)}
    `);
    
    res.send({
      success: true,
      data: results[0]
    });

  } catch (e) {
    res.send({
      success: false,
      message: e.message 
    });
  }
}



/******************************************* Campaign Detail */
app.get('/api/campaign/:campaign_id', async function (req, res) {

  try { 
    const connection = pool.promise();
    
    let campaign = (await connection.query(`
      SELECT 
        *
      FROM campaign 
      WHERE campaign_id = ${connection.escape(req.params.campaign_id)}
    `))[0][0];

    campaign.characters = (await connection.query(`
      SELECT 
        \`character\`.*,
        user.name AS user_name,
        user.user_id,
        user_campaign.user_campaign_id,
        user_campaign.active_character_id
      FROM campaign 
        INNER JOIN \`character\` USING (campaign_id) 
        INNER JOIN user_campaign USING (user_campaign_id)
        INNER JOIN user USING (user_id)
      WHERE campaign.campaign_id = ${connection.escape(req.params.campaign_id)}
    `))[0]
    
    res.send({
      success: true,
      data: campaign
    });

  } catch (e) {
    res.send({
      success: false,
      message: e.message 
    });
  }
});

/******************************************* User */
app.get('/api/user/:user_id', getUser);
app.get('/api/user', getUser); //returns the currently logged in user
async function getUser (req, res) {

  try { 
    const connection = pool.promise();

    let results = await connection.query(`
      SELECT 
        * 
      FROM user 
      WHERE user_id = ${connection.escape(req.params.user_id || req.session.passport.user.user_id)}
    `);
    
    res.send({
      success: true,
      data: results[0]
    });

  } catch (e) {
    res.send({
      success: false,
      message: e.message 
    });
  }
}


/********************************************** Start Server */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})