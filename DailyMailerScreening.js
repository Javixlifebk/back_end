let cron = require('node-cron');
  let nodemailer = require('nodemailer');

  // e-mail message options
  let mailOptions = {
        from: 'reports@javixlife.com',
        to: 'rahulpandeyjaiho@gmail.com,somkiran@gmail.com,niranjanp123@gmail.com,info@javixlife.com,jyotidhiman1910@gmail.com',
        subject: 'Daily Report!',
        html: '<body background=https://www.desktopbackground.org/download/o/2013/05/21/579558_download-blue-backgrounds-1920-1080-live-wallpapers-computer-desktop_1920x1080_h.jpg style=background-repeat:no-repeat><H1><center><div>PortaClinic By JaviX Life</div><img width=200px height=200px src=http://18.60.238.252:3010/profile/arogya.jpg><hr></center></H1><img src=https://www.pngarts.com/files/8/Analyst-PNG-Image-Transparent-Background.png width=200px height=200px> </br> <ul><li><h3>Daily Screening Report- Screener</h3><a href=http://18.60.238.252:3010/documents/dailyScreeningScreener.csv> Please click to view </a></li><br><li><h3>Weekly Screening Report- Screener</h3> <a href=http://18.60.238.252:3010/documents/weeklyScreeningScreener.csv> Please click to view </a></li> <br><li><h3>Daily Screening Report- Sevika</h3><a href=http://18.60.238.252:3010/documents/dailyScreeningSevika.csv> Please click to view </a></li><br><li><h3>Weekly Screening Report- Sevika</h3> <a href=http://18.60.238.252:3010/documents/weeklyScreeningSevika.csv> Please click to view </a></li> <br><li><h3>Daily Citizen Report</h3> <a href=http://18.60.238.252:3010/documents/dailyCitizens.csv> Please click to view </a></li> <br><li> <h3>Daily Citizen Details Report</h3> <a href=http://18.60.238.252:3010/documents/dailyCitizenDetails.csv> Please click to view </a></li> <br><li><h3>Weekly Citizen Report</h3> <a href=http://18.60.238.252:3010/documents/weeklyCitizens.csv> Please click to view </a></li> <br><li><h3>Weekly Citizen Details Report</h3> <a href=http://18.60.238.252:3010/documents/weeklyCitizenDetails.csv> Please click to view </a></li><br><li><h3>Lipid Critical Citizen Report</h3> <a href=http://18.60.238.252:3010/documents/lipidCriticalCitizens.csv> Please click to view </a></li>'
};

  // e-mail transport configuration
let transporter = nodemailer.createTransport({
        host: "mail.javixlife.com",
        port: "465",
        //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
        auth: {
                user: "reports@javixlife.com",
                pass: "Reports!2021@"
        }
});

 cron.schedule('04 04 * * *', () => {
  // Send e-mail
  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        } else {
        }
    });
  });
