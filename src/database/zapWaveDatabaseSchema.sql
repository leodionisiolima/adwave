-- zapWaveDatabaseSchema.sql

-- Tabela de Usuários
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Campanhas
CREATE TABLE Campanhas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_envio TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

-- Tabela de Listas de Envio
CREATE TABLE ListasEnvio (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Tabela de Contatos
CREATE TABLE Contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255)
);

-- Tabela de Associação entre Listas e Contatos
CREATE TABLE AssociacaoListasContatos (
    id SERIAL PRIMARY KEY,
    id_lista INTEGER NOT NULL,
    id_contato INTEGER NOT NULL,
    FOREIGN KEY (id_lista) REFERENCES ListasEnvio(id),
    FOREIGN KEY (id_contato) REFERENCES Contatos(id)
);

-- Tabela de Associação entre Campanhas e Listas de Envio
CREATE TABLE AssociacaoCampanhasListas (
    id SERIAL PRIMARY KEY,
    id_campanha INTEGER NOT NULL,
    id_lista INTEGER NOT NULL,
    FOREIGN KEY (id_campanha) REFERENCES Campanhas(id),
    FOREIGN KEY (id_lista) REFERENCES ListasEnvio(id)
);

-- Tabela de Interesses
CREATE TABLE Interesses (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de Associação Contatos-Interesse
CREATE TABLE AssociacaoContatosInteresse (
    id SERIAL PRIMARY KEY,
    id_contato INTEGER NOT NULL,
    id_interesse INTEGER NOT NULL,
    FOREIGN KEY (id_contato) REFERENCES Contatos(id),
    FOREIGN KEY (id_interesse) REFERENCES Interesses(id)
);
