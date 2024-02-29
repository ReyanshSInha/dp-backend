require("dotenv").config()

// twilio trail credentials

const accountSid = 'AC1eada4dadd93c9df2165cb88aef20a57';
const authToken = '3ce443f91c24dae05b80a0fdaaabad91';
const client = require('twilio')(accountSid, authToken);
const twilioTrialPhoneNumber = '+17792092603';


// Generate random OTP
function genOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.generateOTP = async (req, res) => {
    
    const {mobileNumber} = req.body;
    console.log(`nobileNumber: ${mobileNumber}`)
    const sendOtpTo = "+917252903183";
    //TODO: This route generates OTP and sends it to the user and sends it to the frontend and to the user via text message
    const otp = genOTP();

    client.messages.create({
        body: `Your OTP for DPMA check 12 is: ${otp}`,
        from: twilioTrialPhoneNumber,
        to: sendOtpTo
    }).then(message => {
        console.log(`OTP sent: ${otp}`);
        res.send({ success: true, message: 'OTP sent successfully', text: message, otp: otp });
    }).catch(err => {
        console.error('Error sending OTP:', err);
        res.status(500).send({ success: false, message: 'Failed to send OTP' });
    });


}


