from config import db

class Table(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  nombre = db.Column(db.String(50))
  descripcion = db.Column(db.String(100))

  def to_json(self):
    return {
      'id': self.id,
      'nombre': self.nombre,
      'descripcion': self.descripcion
    }

class List(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  id_table = db.Column(db.Integer, db.ForeignKey('table.id'))
  nombre = db.Column(db.String(50))
  posicion = db.Column(db.Integer)

  def to_json(self):
    return {
      'id': self.id,
      'id_table': self.id_table,
      'nombre': self.nombre,
      'posicion': self.posicion
    }

class Task(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  id_list = db.Column(db.Integer, db.ForeignKey('list.id'))
  titulo = db.Column(db.String(50))
  descripcion = db.Column(db.String(100))
  fecha_vencimiento = db.Column(db.Date)
  etiqueta = db.Column(db.String(50))
  posicion = db.Column(db.Integer)

  def to_json(self):
    return {
      'id': self.id,
      'id_list': self.id_list,
      'titulo': self.titulo,
      'descripcion': self.descripcion,
      'fecha_vencimiento': self.fecha_vencimiento,
      'etiqueta': self.etiqueta,
      'posicion': self.posicion
    }