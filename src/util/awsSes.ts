import  { SendEmailCommand, SendEmailCommandInput, SESClient }  from  "@aws-sdk/client-ses";
import { AWS } from "./constants";


const sesClient = new SESClient({ 
    credentials: {
        accessKeyId: AWS.ACCESS_KEY,
        secretAccessKey: AWS.SECRET_KEY
    },
    region: AWS.REGION 
});

export const getSignupEmailParams = (toAddress: string, authToken: string) => {
    return {
        Destination: {
            ToAddresses: [toAddress],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: getSignupEmailBody(authToken),
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "SongKarma Sign Up",
            },
        },
        Source: "tornicb@hotmail.com" // noReply@song-karma.com SES currently in sb mode, so only verified emails allowed
    };
};

const getSignupEmailBody = (authToken: string) => {
    return `
        <p> Thank you for signing up to SongKarma. Please verify your email by clicking the link below. </p>
        <a href="${process.env.NEXTAUTH_URL}/auth/verify/${authToken}" target="_blank">Verify email</a>
    `
}

export const sendEmail = async (params: SendEmailCommandInput) => {
    try {
        return await sesClient.send(new SendEmailCommand(params));
    } catch(err) {
        console.log(err);
    }
};