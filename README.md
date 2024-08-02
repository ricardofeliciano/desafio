
# Desafio Laravel Fullstack

Bem-vindo ao desafio para integrar o time de desenvolvimento da Solistica como Desenvolvedor Web PHP Full-Stack. Este desafio visa avaliar suas habilidades com as tecnologias utilizadas.

## Tecnologias Utilizadas
Front-End: Desenvolvido com ReactJS.
Back-End: Desenvolvido com Laravel 10 e autenticação JWT.
Banco de Dados: Configurado e iniciado via Docker.
Ambiente: docker

## Front-End
Front-End foi desenvolvido com a tecnologia ReactJS com node:16.

## Instalação do container docker
Na raiz do diretório do desafio, abra o terminal e execute o seguinte comando para construir e iniciar os containers:
docker-compose up  --build


## Instalação/Inicialização do Front-End

Após a execução do comando acima, o front-end estará disponível em:

http://localhost:3000

## Instalação do Banco de dados 

MySQL 8.0

por padrão o backend irá carregar essas credeciais. Caso o container docker suba com o nome de host diferente, por favor alterar na varivel de ambiente no env do backend

DB_CONNECTION=mysql
DB_HOST=desafio-dev-db-1
DB_PORT=3306
DB_DATABASE=desafio
DB_USERNAME=admin
DB_PASSWORD=123

O banco de dados será inicializado automaticamente com uma imagem Docker, incluindo as tabelas e alguns registros iniciais.

## Instalação/Inicialização do Back-end
Foi desenvolvido usando Laravel 10 com php 8 e as APi's fazendo autenticação com JWT.
O back-end será iniciado automaticamente e estará acessível em:

http://localhost:8000/api

# Observações

O desafio está configurado para iniciar três ambientes separados usando Docker Compose.
Certifique-se de que o Docker e o Docker Compose estão instalados e atualizados em sua máquina antes de iniciar o processo.
Caso tenha mais alguma dúvida ou precise de ajustes adicionais, é só avisar!


