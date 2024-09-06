from flask import request, jsonify
from config import app, db
from models import Table, List, Task
from sqlalchemy import inspect
from werkzeug.exceptions import BadRequest

# Tables routes
@app.route('/api/tables', methods=['GET', 'POST', 'DELETE'])
def tables():
  try:
    if request.method == 'GET':
      tables = Table.query.all()
      return jsonify([table.to_json() for table in tables]), 200
    elif request.method == 'POST':
      data = request.get_json()

      if not data or 'nombre' not in data or 'descripcion' not in data:
          raise BadRequest("Por favor, complete todos los campos requeridos")
      
      table = Table(nombre=data['nombre'], descripcion=data['descripcion'])
      db.session.add(table)
      db.session.commit()
      return jsonify(table.to_json()), 201
    elif request.method == 'DELETE':
      data = request.get_json()
      table = Table.query.get(data['id'])
      if not table:
          raise BadRequest("La tabla no existe")
      
      db.session.delete(table)
      db.session.commit()
      return jsonify({'message': 'Tabla eliminada correctamente'}), 200
  except BadRequest as e:
    return jsonify({'error': str(e)}), 400
  except Exception as e:
    # Log the error to the console for debugging
    print(f"Error: {e}")
    return jsonify({'error': str(e)}), 500
  

# Lists routes
@app.route('/api/tables/<int:table_id>/lists', methods=['POST'])
def create_list(table_id):
  # Verifica si la tabla existe
  table = Table.query.get(table_id)
  if not table:
    return jsonify({'error': 'La tabla no existe'}), 404

  try:
    data = request.get_json()

    if not data or 'nombre' not in data or 'posicion' not in data:
      raise BadRequest("Por favor, complete todos los campos requeridos")

    new_list = List(
      id_table=table_id,
      nombre=data['nombre'],
      posicion=data['posicion']
    )

    db.session.add(new_list)
    db.session.commit()

    return jsonify(new_list.to_json()), 201

  except BadRequest as e:
    return jsonify({'error': str(e)}), 400
  except Exception as e:
    return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/api/tables/<int:table_id>/lists', methods=['GET'])
def get_lists(table_id):
  # Verifica si la tabla existe
  table = Table.query.get(table_id)
  if not table:
    return jsonify({'error': 'La tabla no existe'}), 404

  lists = List.query.filter_by(id_table=table_id).all()
  return jsonify([list_.to_json() for list_ in lists]), 200

@app.route('/api/lists/<int:list_id>', methods=['PUT'])
def update_list(list_id):
  list_ = List.query.get(list_id)
  if not list_:
    return jsonify({'error': 'La lista no existe'}), 404

  data = request.get_json()

  list_.nombre = data.get('nombre', list_.nombre)
  list_.posicion = data.get('posicion', list_.posicion)

  db.session.commit()
  return jsonify(list_.to_json()), 200

@app.route('/api/lists/<int:list_id>', methods=['DELETE'])
def delete_list(list_id):
  list_ = List.query.get(list_id)
  if not list_:
    return jsonify({'error': 'La lista no existe'}), 404

  db.session.delete(list_)
  db.session.commit()
  return jsonify({'message': 'Lista eliminada correctamente'}), 200


# Tasks routes
@app.route('/api/lists/<int:list_id>/tasks', methods=['GET'])
def get_tasks(list_id):
  # Verifica si la lista existe
  list_ = List.query.get(list_id)
  if not list_:
    return jsonify({'error': 'La lista no existe'}), 404

  tasks = Task.query.filter_by(id_list=list_id).all()
  return jsonify([task.to_json() for task in tasks]), 200


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
  task = Task.query.get(task_id)
  if not task:
    return jsonify({'error': 'La tarea no existe'}), 404

  data = request.get_json()

  task.titulo = data.get('titulo', task.titulo)
  task.descripcion = data.get('descripcion', task.descripcion)
  task.fecha_vencimiento = data.get('fecha_vencimiento', task.fecha_vencimiento)
  task.etiqueta = data.get('etiqueta', task.etiqueta)
  task.posicion = data.get('posicion', task.posicion)

  db.session.commit()
  return jsonify(task.to_json()), 200


@app.route('/api/lists/<int:list_id>/tasks', methods=['POST'])
def create_task(list_id):
  # Verifica si la lista existe
  list_ = List.query.get(list_id)
  if not list_:
    return jsonify({'error': 'La lista no existe'}), 404

  try:
    data = request.get_json()

    if not data or 'titulo' not in data or 'descripcion' not in data or 'posicion' not in data:
        raise BadRequest("Por favor, complete todos los campos requeridos")

    new_task = Task(
        id_list=list_id,
        titulo=data['titulo'],
        descripcion=data['descripcion'],
        fecha_vencimiento=data.get('fecha_vencimiento'),  # Fecha es opcional
        etiqueta=data.get('etiqueta'),  # Etiqueta es opcional
        posicion=data['posicion']
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_json()), 201

  except BadRequest as e:
    return jsonify({'error': str(e)}), 400
  except Exception as e:
    return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
  task = Task.query.get(task_id)
  if not task:
    return jsonify({'error': 'La tarea no existe'}), 404

  db.session.delete(task)
  db.session.commit()
  return jsonify({'message': 'Tarea eliminada correctamente'}), 200
    
if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(host='0.0.0.0', port=5001, debug=True)