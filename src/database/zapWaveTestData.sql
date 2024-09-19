-- Inserir um usuário de teste
INSERT INTO usuarios (nome, email, senha) VALUES ('leonardo', 'leo@example.com', 'senhaSegura');

-- Inserir um contato de teste
INSERT INTO contatos (nome, telefone, email) VALUES ('Contato Teste', '+5511999999999', 'contato@teste.com');

-- Inserir uma campanha de teste
INSERT INTO campanhas (nome, tipo, conteudo, id_usuario) VALUES ('Campanha Teste', 'texto', 'Olá, este é um teste!', 1);

-- Inserir uma lista de envio de teste
INSERT INTO listasenvio (nome, descricao) VALUES ('Lista de Envio Teste', 'Descrição da lista de envio');

-- Associar o contato à lista de envio
INSERT INTO associacaolistascontatos (id_lista, id_contato) VALUES (1, 1);

-- Associar a campanha à lista de envio
INSERT INTO associacaocampanhaslistas (id_campanha, id_lista) VALUES (1, 1);

-- Inserir um interesse de teste
INSERT INTO interesses (nome) VALUES ('Interesse Teste');

-- Associar o contato ao interesse
INSERT INTO associacaocontatosinteresse (id_contato, id_interesse) VALUES (1, 1);
