USE evaluacion_emilia_geovana_lima_palencia;

punteo_usuarioCREATE TABLE punteo_usuario (
  id int auto_increment primary key,
  idUsuario int not null,
  punteo int not null,
  CONSTRAINT fk_usuario FOREIGN KEY (idUsuario) REFERENCES usuario(id) 
);

