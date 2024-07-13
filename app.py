from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return render_template("index.html")\n\nif __name__ == "__main__":\n    app.run(debug=True)
