from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def add_task():
    data = request.json
    task = data["task"]
    tasks.append(task)
    return jsonify({"message": "Task added"}), 201

if __name__ == "__main__":
    app.run(debug=True)