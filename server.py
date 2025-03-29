from flask import Flask, render_template, request, redirect, flash, jsonify
import requests

app = Flask(__name__)


BOT_TOKEN = "7621892336:AAHsJrltQ_XGJdJhbneXR6MDlrNbgEitxbk"
CHAT_ID = "7829040192"
# Telegram API URL
TELEGRAM_URL = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'

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
    name = request.form.get('name')
    last = request.form.get('last')
    email = request.form.get('email')
    message = request.form.get('message')
    phone = request.form.get('phone')

    telegram_message = f"Nueva messaje de {name} {last} ({email}) \n Phone Number: {phone} \n\nMessage: {message}"
    print(name)
    print(email)
    print(message)
    # Send the message to Telegram
    payload = {
        'chat_id': CHAT_ID,
        'text': telegram_message
    }
    response = requests.post(TELEGRAM_URL, data=payload)
    print(response.text)
    # Check if the message was sent successfully
    if response.status_code == 200:
        return jsonify({"success": True, "message": "Message sent to Telegram!"})
    else:
        return jsonify({"success": False, "message": "Error sending message to Telegram."})


if __name__ == '__main__':
    app.run(debug=True, port=5001)