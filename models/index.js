import Categoria from "./categorias.model";
import Comentario from "./comentarios.model";
import Estado from "./estados.model";
import Etiqueta from "./etiquetas.model";
import Noticia from "./noticias.model";
import Noticia_etiqueta from "./noticias_etiquetas.model";
import Noticia_guardada from "./noticias_guardadas.model";
import Rol from "./roles.model";
import Subcategoria from "./subcategorias.model";
import Usuario from "./usuarios.model";

const db = {};

db.Categoria = Categoria;
db.Comentario = Comentario;
db.Estado = Estado;
db.Etiqueta = Etiqueta;
db.Noticia = Noticia;
db.Noticia_etiqueta = Noticia_etiqueta;
db.Noticia_guardada = Noticia_guardada;
db.Rol = Rol;
db.Subcategoria = Subcategoria;
db.Usuario = Usuario;

// Relaciones 'belongsTo' (muchos a uno)
Noticia.belongsTo(Usuario, { foreignKey: "usuario_id" });
Noticia.belongsTo(Categoria, { foreignKey: "categoria_id" });
Noticia.belongsTo(Subcategoria, { foreignKey: "subcategoria_id" });
Noticia.belongsTo(Estado, { foreignKey: "estado_id" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });
Comentario.belongsTo(Noticia, { foreignKey: "noticia_id" });
Subcategoria.belongsTo(Categoria, { foreignKey: "categoria_id" });

// Relaciones 'hasMany' (uno a muchos)
Usuario.hasMany(Noticia, { foreignKey: "usuario_id" });
Usuario.hasMany(Comentario, { foreignKey: "usuario_id" });
Categoria.hasMany(Noticia, { foreignKey: "categoria_id" });
Categoria.hasMany(Subcategoria, { foreignKey: "categoria_id" });
Subcategoria.hasMany(Noticia, { foreignKey: "subcategoria_id" });
Estado.hasMany(Noticia, { foreignKey: "estado_id" });
Noticia.hasMany(Comentario, { foreignKey: "noticia_id" });

// Relaciones 'belongsToMany' (muchos a muchos)
Noticia.belongsToMany(Etiqueta, {
  through: Noticia_etiqueta,
  foreignKey: "noticia_id",
});
Etiqueta.belongsToMany(Noticia, {
  through: Noticia_etiqueta,
  foreignKey: "etiqueta_id",
});

Usuario.belongsToMany(Noticia, {
  through: Noticia_guardada,
  foreignKey: "usuario_id",
});
Noticia.belongsToMany(Usuario, {
  through: Noticia_guardada,
  foreignKey: "noticia_id",
});

// Relación Usuario-Rol (muchos a uno)
Usuario.belongsTo(Rol, { foreignKey: "rol_id" });
Rol.hasMany(Usuario, { foreignKey: "rol_id" });

export default db;
