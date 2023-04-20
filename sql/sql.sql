CREATE DATABASE PROJETOBD;
USE PROJETOBD;

CREATE TABLE Usuario (
  idUsuario INTEGER AUTO_INCREMENT,
  nomeUsuario VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL,
  endereco VARCHAR(50) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  cep VARCHAR(8) NOT NULL,
  PRIMARY KEY(idUsuario)
);

CREATE TABLE PontoDeColeta (
  idPontoDeColeta INTEGER AUTO_INCREMENT,
  endereco VARCHAR(50) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  cep VARCHAR(8) NOT NULL,
  telefone VARCHAR(10) NOT NULL,
  horarioAbertura TIME NOT NULL,
  horarioFechamento TIME NOT NULL,
  PRIMARY KEY(idPontoDeColeta)
);

CREATE TABLE Categoria_Residuo (
  idCategoria INTEGER AUTO_INCREMENT,
  Descricao VARCHAR(50) NOT NULL,
  PRIMARY KEY(idCategoria)
);

CREATE TABLE Descarte (
  idUsuario INTEGER NOT NULL,
  idPontoDeColeta INTEGER NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  PRIMARY KEY(idUsuario, idPontoDeColeta),
  FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY(idPontoDeColeta) REFERENCES PontoDeColeta(idPontoDeColeta)
);

CREATE TABLE CategoriaResiduo_Descarte (
  idCategoria INTEGER NOT NULL,
  idPontoDeColeta INTEGER NOT NULL,
  idUsuario INTEGER NOT NULL,
  PRIMARY KEY(idCategoria, idPontoDeColeta, idUsuario),
  FOREIGN KEY(idCategoria) REFERENCES Categoria_Residuo(idCategoria),
  FOREIGN KEY(idPontoDeColeta) REFERENCES PontoDeColeta(idPontoDeColeta),
  FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE CategoriaR_PontoDeColeta (
  idCategoria INTEGER NOT NULL,
  idPontoDeColeta INTEGER NOT NULL,
  PRIMARY KEY(idCategoria, idPontoDeColeta),
  FOREIGN KEY(idCategoria) REFERENCES Categoria_Residuo(idCategoria),
  FOREIGN KEY(idPontoDeColeta) REFERENCES PontoDeColeta(idPontoDeColeta)
);



