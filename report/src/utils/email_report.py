#!/usr/bin/env python3
"""
Network Monitoring Report Email Sender

This script sends the generated network monitoring report via email.

Usage:
    python email_report.py --report report.pdf --recipient client@example.com

Requirements:
    - smtplib (standard library)
"""

import argparse
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Send network monitoring report via email')
    parser.add_argument('--report', required=True, help='Path to the report file (PDF)')
    parser.add_argument('--recipient', required=True, help='Email recipient')
    parser.add_argument('--subject', default='Network Performance Report', help='Email subject')
    parser.add_argument('--sender', default='noreply@company.com', help='Email sender')
    parser.add_argument('--server', default='localhost', help='SMTP server')
    parser.add_argument('--port', type=int, default=587, help='SMTP port')
    parser.add_argument('--username', default='', help='SMTP username')
    parser.add_argument('--password', default='', help='SMTP password')
    parser.add_argument('--no-tls', action='store_true', help='Disable TLS')
    return parser.parse_args()

def send_email(send_from, send_to, subject, message, files=None,
              server="localhost", port=587, username='', password='',
              use_tls=True):
    """Send an email with attachments."""
    msg = MIMEMultipart()
    msg['From'] = send_from
    msg['To'] = send_to
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message))
    
    if files:
        for file in files:
            part = MIMEBase('application', "octet-stream")
            with open(file, 'rb') as file_obj:
                part.set_payload(file_obj.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                           'attachment; filename="{}"'.format(os.path.basename(file)))
            msg.attach(part)
    
    try:
        smtp = smtplib.SMTP(server, port)
        if use_tls:
            smtp.starttls()
        if username:
            smtp.login(username, password)
        smtp.sendmail(send_from, send_to, msg.as_string())
        smtp.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Check if report file exists
    if not os.path.isfile(args.report):
        print(f"Error: Report file not found: {args.report}")
        return
    
    # Prepare email message
    message = f"""
Dear Client,

Please find attached the Network Performance Report.

This report provides a comprehensive analysis of your network's performance, 
including device status, utilization metrics, and support ticket statistics.

If you have any questions or need further information, please don't hesitate to contact us.

Best regards,
Your Network Support Team
"""
    
    # Send email
    print(f"Sending report to {args.recipient}...")
    success = send_email(
        send_from=args.sender,
        send_to=args.recipient,
        subject=args.subject,
        message=message,
        files=[args.report],
        server=args.server,
        port=args.port,
        username=args.username,
        password=args.password,
        use_tls=not args.no_tls
    )
    
    if success:
        print("Report sent successfully!")
    else:
        print("Failed to send report.")

if __name__ == '__main__':
    main()