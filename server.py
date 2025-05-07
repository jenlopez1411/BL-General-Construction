from flask import Flask, render_template, request, redirect, flash, jsonify
import requests
import smtplib
from email.mime.text import MIMEText
app = Flask(__name__)


# BOT_TOKEN = ""
# CHAT_ID = ""
# Your email settings
EMAIL_ADDRESS = "jennifersophia1411@gmail.com"
EMAIL_PASSWORD = "klgb ylhi zqef hpia"
# EMAIL_ADDRESS = "" # enter gmail
# EMAIL_PASSWORD = "" # Use app password, not your Gmail login, look up gmail settings
# Telegram API URL
# TELEGRAM_URL = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'

# Home Page
@app.route('/')
def home():
    return render_template('index.html')

# About Page
@app.route('/about')
def about():
    return render_template('about.html')

# Contact Page with Form Submission
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Print form data (can be saved to a database or emailed)
        print(f"New Message from {name} ({email}): {message}")
        
        return redirect('/success')  # Redirect after submission
    return render_template('contact.html')

# Success Page
@app.route('/success')
def success():
    return "<h1>Message Sent Successfully!</h1>"


@app.route('/send_telegram', methods=["POST"])
def send_telegram():
    # name = request.form.get('name')
    # last = request.form.get('last')
    # email = request.form.get('email')
    # message = request.form.get('message')
    # phone = request.form.get('phone')

    name = request.form['name']
    last = request.form['last']
    phone = request.form['phone']
    email = request.form['email']
    message = request.form['message']
    full_message = f"""
    New Contact Form Submission:

    Name: {name} {last}
    Phone: {phone}
    Email: {email}
    
    Message:
    {message}
    """
    msg = MIMEText(full_message)
    msg['Subject'] = 'New Contact Form Message'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS  # You can also send to another address
    print(msg)
    # Send the email via Gmail SMTP
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        # return redirect("/thank-you")  # Redirect after success
    except Exception as e:
        return f"Something went wrong: {e}"


if __name__ == '__main__':
    app.run(debug=True, port=5000)

