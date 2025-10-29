# Similar Products API

API desarrollada en **NestJS** siguiendo arquitectura limpia (Clean Architecture) que permite obtener productos similares a un producto dado.  

Este proyecto utiliza **mocks en Docker** para simular las APIs existentes y cumplir con el contrato OpenAPI definido para la integración con frontend.

---

## Descripción

El proyecto expone el endpoint:

GET /product/{productId}/similar

- Devuelve los detalles de productos similares a un producto dado.
- Cumple con el contrato OpenAPI acordado.

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

Este proyecto depende de APIs simuladas (mocks) que ya están preparadas en un repositorio de pruebas proporcionado.  
Los mocks corren en Docker en `localhost:3001` y exponen los siguientes endpoints:

- `/product/{productId}/similarids` → devuelve los IDs de productos similares.
- `/product/{productId}` → devuelve los detalles de cada producto.

> Nota: Asegúrate de haber clonado o descargado el repositorio con los mocks antes de ejecutar:
```bash
docker-compose up -d
```

#### Levantar la aplicación NestJS
```bash
npm run start:dev
```

## Probar la API

#### Usando curl
```bash
curl http://localhost:5000/product/1/similar
```

#### Usando cliente http

Crear petición GET a http://localhost:5000/product/1/similar
