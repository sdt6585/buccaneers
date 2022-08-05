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
const express = require('express')
const app = express()
const port = 80

app.use(express.static('client'))

/******************************************* Campaigns */
app.get('/api/user/:user_id/campaigns', async function (req, res) {

  try { 
    const connection = pool.promise();

    let results = await connection.query(`
      SELECT 
        campaign.* 
      FROM campaign 
        INNER JOIN user_campaign USING (campaign_id) 
      WHERE user_campaign.user_id = ${connection.escape(req.params.user_id)}
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
});



/******************************************* Characters */
app.get('/api/campaign/:campaign_id/characters', async function (req, res) {

  try { 
    const connection = pool.promise();

    let results = await connection.query(`
      SELECT 
        character.*
      FROM campaign 
        INNER JOIN character USING (campaign_id) 
      WHERE campaign.campaign_id = ${connection.escape(req.params.campaign_id)}
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
});


/********************************************** Start Server */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})