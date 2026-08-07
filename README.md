# Taller Docker Optimizacion


## Comandos ejecutados

```bash
sudo docker network create app-net
sudo docker volume create gpdata
sudo docker run -d --name db --network app-net -v gpdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:15-alpine
sudo docker run -d --name api --network app-net -e DB_HOST=db -p 3000:3000 node:22-alpine tail -f /dev/null
sudo docker run -d --name web --network app-net -p 5000:5000 nginx:latest