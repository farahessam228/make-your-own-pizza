using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using MakeYourOwnPizza.settings;
namespace MakeYourOwnPizza.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task SendVerificationEmailAsync(
            string email,
            string otp)
        {
            using var message = new MailMessage();

            message.From = new MailAddress(
                _settings.From,
                "Your Application");

            message.To.Add(email);

            message.Subject = "Email Verification Code";

            message.Body = $"""
            Hello,

            Thank you for registering.

            Your verification code is:

            {otp}

            Please enter this code to verify your email address.

            If you did not request this code, you can safely ignore this email.

            Regards,
            Your Application Team
            """;

            message.IsBodyHtml = false;

            using var smtpClient = new SmtpClient(
                _settings.Host,
                _settings.Port)
            {
                Credentials = new NetworkCredential(
                    _settings.Username,
                    _settings.Password),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false
            };

            try
            {
                await smtpClient.SendMailAsync(message);
            }
            catch (SmtpException ex)
            {
                // Improve error clarity for common Gmail authentication issues
                throw new InvalidOperationException(
                    "SMTP send failed. Ensure EmailSettings are correct, the Gmail account has 2FA enabled and an App Password is set in GMAIL_APP_PASSWORD, and the container environment contains the password.",
                    ex);
            }
        }
    }
}