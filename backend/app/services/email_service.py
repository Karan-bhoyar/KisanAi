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
        print("Starting Email Service...")
        print("To:", to_email)
        print("PDF:", pdf_path)

        if not os.path.exists(pdf_path):
            print("PDF NOT FOUND:", pdf_path)
            return False

        msg = EmailMessage()

        msg["Subject"] = "🌾 Kisan AI Disease Detection Report"

        msg["From"] = settings.EMAIL_FROM

        msg["To"] = to_email

        msg.set_content(f"""
Hello {farmer_name},

Your crop disease analysis has been completed successfully.

Disease:
{disease_name}

Confidence:
{confidence}

The complete report is attached with this email.

Thank you for using Kisan AI 🌾

Regards,
Kisan AI Team
""")

        print("Attaching PDF...")

        with open(pdf_path, "rb") as pdf:

            msg.add_attachment(
                pdf.read(),
                maintype="application",
                subtype="pdf",
                filename=os.path.basename(pdf_path)
            )

        print("Connecting SMTP Server...")

        server = smtplib.SMTP(
            settings.SMTP_SERVER,
            settings.SMTP_PORT
        )

        server.ehlo()

        print("Starting TLS...")

        server.starttls()

        server.ehlo()

        print("Logging In...")

        server.login(
            settings.EMAIL_USERNAME,
            settings.EMAIL_PASSWORD
        )

        print("Login Successful")

        print("Sending Email...")

        server.send_message(msg)

        server.quit()

        print("EMAIL SENT SUCCESSFULLY")
        print("=" * 60)

        return True

    except Exception as e:

        print("=" * 60)
        print("EMAIL ERROR")
        print(type(e).__name__)
        print(e)
        print("=" * 60)

        return False