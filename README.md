# Next.js Open Jira App
para ccorrer localmente, se necestia la base de datos
...
docker-compose up -d
...
* El  -d, significa __detacherd__

* Mongo DB URL Local
***
mongodb://localhost:27017
***

## Caonfigurar las variables de entorno
 Renombrar el archivo __.env.template__  a __.env__

## Reconstruir los modulos de node
```yarn install o npm install ```

## Correr poryecto 
 ```npm run dev``
## Llenar la base de datos con informacion de pruebas
  Llamar este url
  ...
 ````
 http://localhost:3000/api/seed

 ````