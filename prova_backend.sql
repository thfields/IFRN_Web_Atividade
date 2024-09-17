-- Criar o banco de dados
CREATE DATABASE prova_backend;

-- Usar o banco de dados
USE prova_backend;

-- Tabela de usuários
CREATE TABLE `usuarios` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `nome` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `admin` TINYINT(1) DEFAULT 0,
  `foto` varchar(255)
);

-- Tabela de produtos
CREATE TABLE `produtos` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `nome` varchar(30) NOT NULL,
  `foto` varchar(255),
  `descricao` varchar(250),
  `quantidade` int(11), -- Adiciona a coluna para quantidade
  `valor` decimal(10, 2), -- Adiciona a coluna para valor com duas casas decimais
  `usuario_id` int(11), -- Adiciona a coluna para a chave estrangeira
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL -- Adiciona a chave estrangeira
);

