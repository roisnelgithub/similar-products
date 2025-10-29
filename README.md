# Similar Products API

API desarrollada en NestJS siguiendo arquitectura limpia (Clean Architecture) que permite obtener productos similares a un producto dado.

Este proyecto utiliza mocks en Docker para simular las APIs existentes y cumplir con el contrato OpenAPI definido para la integración con frontend.

---

## Requisitos

- Node.js >= 18
- npm
- Docker y Docker Compose

## Instalación
#### Instalar dependencias:
```bash
npm install
```
#### Mocks de Docker
```bash
docker-compose up -d
```
> **Nota:** Levantar los mocks de Docker (debes clonar o descargar el repositorio con los mocks)



#### Levantar la aplicación NestJS
```bash
npm run start:dev
```
## Documentación Swagger
Después de levantar la aplicación, puedes acceder a Swagger UI para explorar la API y probar los endpoints de forma interactiva:

```bash
http://localhost:5000/api-docs
```
## Probar la API

#### Usando curl
```bash
curl http://localhost:5000/product/1/similar
```

#### Usando cliente http

Crear petición GET a http://localhost:5000/product/1/similar
