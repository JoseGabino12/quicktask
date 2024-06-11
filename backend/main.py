from flask import request, jsonify
from config import app, db
from models import Table, List, Task
from werkzeug.exceptions import BadRequest

@app.route('/api/tables', methods=['GET', 'POST', 'DELETE'])
def tables():
  if request.method == 'GET':
    tables = Table.query.all()
    return jsonify([table.to_json() for table in tables]), 200
  elif request.method == 'POST':
    try:
      data = request.get_json()

      if not data or 'nombre' not in data or 'descripcion' not in data:
        raise BadRequest("Por favor, complete todos los campos requeridos")
      
      table = Table(nombre=data['nombre'], descripcion=data['descripcion'])
      db.session.add(table)
      db.session.commit()
      return jsonify(table.to_json()), 201

    except BadRequest as e:
      return jsonify({'error': str(e)}), 400
    except Exception as e:
      return jsonify({'error': 'An unexpected error occurred'}), 500
  elif request.method == 'DELETE':
    try:
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
      return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)