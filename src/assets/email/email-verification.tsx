interface EmailVerificationProps {
  verificationCode: string;
  receiverName: string;
}

export const generateEmailVerificationHTML = ({ verificationCode, receiverName }: EmailVerificationProps): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>

      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      </style>

    </head>
    <body style="background-color: #e9ecef;">

      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <p style="margin: 0;">Hi ${receiverName}!<br><br>We are happy to see you among us! Please enter the code below on your application to activate your account. Afterwards, you can safely delete this email.<br><br>Enjoy GEL!!</p>
        </td>
      </tr>

      <tr>
        <td align="center" bgcolor="#ffffff">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                      <p target="_blank" style="display: inline-block; padding: 3px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </body>
    </html>
  `;
};
