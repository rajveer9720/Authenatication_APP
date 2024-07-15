import nodemailer from 'nodemailer';
import User from "@/models/UserModel";
import bcryptjs from 'bcryptjs';
import { Console } from 'console';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // const hashedToken = "Abc12365"
        console.log(hashedToken)

        if (emailType === "VERIFY") {
            console.log(email,typeof email, emailType, typeof emailType, userId);
            
            await User.findByIdAndUpdate(userId, 
                {
                    $set: {
                      verifyToken: hashedToken,
                      verifyTokenExpiry: Date.now() + 3600000
        
                    }
         } )
               
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                $set: {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 36000004
                }
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5e53a349ae90ea",
              pass: "cf94b953e04d68"
            }
          });


        const mailOptions = {
            from: 'rajveersingh05021999@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}