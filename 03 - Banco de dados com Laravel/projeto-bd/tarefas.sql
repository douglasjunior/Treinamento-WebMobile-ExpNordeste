DROP TABLE IF EXISTS `tarefas`;
CREATE TABLE IF NOT EXISTS `tarefas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `ativa` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `tarefas` (`id`, `titulo`, `ativa`) VALUES
	(1, 'teste 1', 1),
	(2, 'teste 2\r\n', 1),
	(3, 'teste 3\r\n', 0);
