from flask import Blueprint, request, jsonify
import sqlite3

tasks_bp = Blueprint("tasks", __name__)

def get_db_connection():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn


@tasks_bp.route("/api/tasks", methods=["GET"])
def get_tasks():

    conn = get_db_connection()

    tasks = conn.execute("SELECT * FROM tasks").fetchall()

    conn.close()

    return jsonify([dict(task) for task in tasks])


@tasks_bp.route("/api/tasks", methods=["POST"])
def add_task():

    data = request.json

    task = data["task"]

    conn = get_db_connection()

    conn.execute("INSERT INTO tasks (task) VALUES (?)", (task,))

    conn.commit()

    conn.close()

    return jsonify({"message": "Task added"})


@tasks_bp.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):

    conn = get_db_connection()

    conn.execute("DELETE FROM tasks WHERE id=?", (task_id,))

    conn.commit()

    conn.close()

    return jsonify({"message": "Task deleted"})

@tasks_bp.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.json
    new_task = data["task"]

    conn = get_db_connection()

    conn.execute(
        "UPDATE tasks SET task=? WHERE id=?",
        (new_task, task_id)
    )

    conn.commit()
    conn.close()

    return jsonify({"message":"Task updated"})

@tasks_bp.route("/api/tasks/<int:task_id>/toggle", methods=["PUT"])
def toggle_task(task_id):

    conn = get_db_connection()

    task = conn.execute(
        "SELECT completed FROM tasks WHERE id = ?",
        (task_id,)
    ).fetchone()

    new_status = 0 if task["completed"] else 1

    conn.execute(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        (new_status, task_id)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Task status updated"})