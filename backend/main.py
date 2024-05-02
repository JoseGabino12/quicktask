from flask import request, jsonify
from config import app, db
from models import Table, List, Task

@app.route('/tables', methods=['GET', 'POST'])
def tables():
  if request.method == 'GET':
    tables = Table.query.all()
    return jsonify([table.to_json() for table in tables])
  elif request.method == 'POST':
    data = request.json
    table = Table(nombre=data['nombre'], descripcion=data['descripcion'])
    db.session.add(table)
    db.session.commit()
    return jsonify(table.to_json())

if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)