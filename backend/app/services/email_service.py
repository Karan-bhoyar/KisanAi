import os
import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_report_email(
    to_email: str,
    farmer_name: str,
    disease_name: str,
    confidence: str,
    pdf_path: str
):

    try:

        print("=" * 60)
        print("Starting Email Service")
        print("To:", to_email)
        print("PDF:", pdf_path)

        # Check PDF
        if not pdf_path or not os.path.exists(pdf_path):

            print("PDF NOT FOUND:", pdf_path)

            return False

        # Create Email
        msg = EmailMessage()

        msg["Subject"] = "Kisan AI Disease Detection Report"
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = to_email

        msg.set_content(
            f"""
Hello {farmer_name},

Your crop disease analysis has been completed.

Disease:
{disease_name}

Confidence:
{confidence}

The complete disease detection report is attached to this email.

Thank you for using Kisan AI.

Regards,
Kisan AI Team
"""
        )

        # Attach PDF
        with open(pdf_path, "rb") as pdf:

            msg.add_attachment(
                pdf.read(),
                maintype="application",
                subtype="pdf",
                filename=os.path.basename(pdf_path)
            )

        print("Connecting to SMTP server...")

        # Automatically closes the SMTP connection
        with smtplib.SMTP(
            settings.SMTP_SERVER,
            settings.SMTP_PORT,
            timeout=30
        ) as server:

            server.ehlo()

            print("Starting TLS...")

            server.starttls()

            server.ehlo()

            print("Logging in...")

            server.login(
                settings.EMAIL_USERNAME,
                settings.EMAIL_PASSWORD
            )

            print("Sending email...")

            server.send_message(msg)

        print("EMAIL SENT SUCCESSFULLY")
        print("=" * 60)

        return True

    except smtplib.SMTPAuthenticationError as e:

        print("SMTP AUTHENTICATION ERROR")
        print(e)

        return False

    except smtplib.SMTPException as e:

        print("SMTP ERROR")
        print(e)

        return False

    except Exception as e:

        print("EMAIL ERROR")
        print(type(e).__name__)
        print(e)

        return False