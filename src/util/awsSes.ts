import  { SendEmailCommand, SendEmailCommandInput, SESClient }  from  "@aws-sdk/client-ses";

const REGION = "eu-west-1";
const sesClient = new SESClient({ region: REGION });

export const getSignupEmailParams = (toAddress: string) => {
    return {
        Destination: {
            ToAddresses: [toAddress],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: getSignupEmailBody(),
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "SongKarma Sign Up",
            },
        },
        Source: "noReply@song-karma.com",
    };
};

const getSignupEmailBody = () => {
    return `
        <p> Thank you for signing up to SongKarma. Please verify your email by clicking the link below. </p>
        <a href="${process.env.NEXTAUTH_URL}/api/..." target="_blank">Verfiy email</a>
    `
}

export const sendEmail = async (params: SendEmailCommandInput) => {
    try {
        return await sesClient.send(new SendEmailCommand(params));
    } catch(err) {
        console.log(err);
    }
};