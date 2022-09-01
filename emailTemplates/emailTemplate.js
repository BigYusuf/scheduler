
const verifyEmailTemplate = (user, req) => {
    return `<h1>Thanks for shopping with us</h1>
    <p>
    Hi ${user.name},</p>
    <h2>Thanks for registering on our site.</h2>
    <h4> Please verify your email to continue enjoying our services</h4>
    <a href='http://${req.headers.host}/api/users/verify-email?token=${user.emailToken}'> Verify Email</a>
    <hr/>
    <p>
    Thanks for using our service with us.
    </p>
    `;
  };
const resetPasswordTemplate = (user, req) => {
    return `<h1>Reset Password</h1>
    <p>
    Hi ${user.name},</p>
    <h2>Thanks for registering on our site.</h2>
    <h4> Please click the link to reset your password</h4>
    <a href='http://${req.headers.host}/api/users/reset-password/${user.resetpasswordToken}'> Reset Account Password</a>
    <hr/>
    <p>
    Just ignore this message, If you didn't authorize this.
    </p>
    `;
  };
const PromoTemplate = (user, req) => {
    return `<h1>1st Promotional Email</h1>
    <p>
    Hi ${user.name},</p>
    <h2>Welccome to prommotional email.</h2>
    <h4> Check out this cool portfolio and see the awesomeness of BigYusuf</h4>
    <a href='http://yusuflateef.vercel.app'>Portfolio </a>
    <hr/>
    <p>
    Yeah, It worked.
    </p>
    `;
  };
  
  module.exports= {verifyEmailTemplate, resetPasswordTemplate, PromoTemplate}