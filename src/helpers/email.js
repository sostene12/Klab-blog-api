import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

export const mailer = async  (emailfrom,message) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SEND_MAIL,
            pass:process.env.PASS_MAIL,
        },
        tls: {
            rejectUnauthorized: false
          }
    });

    let sendinfo = {
        from: emailfrom,
        to: "ngarukiyimanasostene@gmail.com", 
        subject:"the message sent from contact form",
        html: `<b>${message}</b>`,
      };

      try {
        const sendMail =  transporter.sendMail(sendinfo,(error,info) =>{
            if(error){
                throw new Error(error)
            }
            return sendMail;
        })
      } catch (error) {
        return error;
      }
}
