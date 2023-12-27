
<p align="center" width="100%" >
    <img src="https://github.com/Desturx/Plether/assets/33758758/52180d3f-d34a-448c-bbc1-0cc973e2de7f" width="88%">
</p>

# ¿Que es plether?
Plether es una plataforma web con el objetivo de fomentar la socialización entre diferentes personas mediante los juegos. Para
lograr esto, ofrece a sus usuarios una forma rápida y sencilla de jugar a estos videojuegos competitivos o de desafío. 

# ¿Cón que se ha desarrollado?
Para el desarrollo de esta aplicación se ha utilizado VUE para el frontend, NodeJs para el backend, MongoDB como base de datos y Phaser para el desarrollo de los juegos que se van a albergar dentro de Plether.

# ¿Cómo inciarlo?
Para más claridad se va separar en dos partes, cómo poner a funcionar el backend de la aplicación, y cómo poner a funcionar el frontend de la aplicación.
## Para el backend
Los pasos a seguir para que la aplicación funcione: 
1. Instalar MongoDB.
2. Hacer `npm install` en la carpeta de frontend para que se instalen todas las librerías.
3. En el fichero .env cambiar `DBNAME=` por el nombre de la base de datos que se quiera utilizar. Y el `SECRET_KEY=` por el que se quiera
utilizar.
4. Iniciar la base de datos[^1].
5. Iniciar el backend mediante `npm run dev`

## Para el frontend
> [!NOTE]
> Antes de poner a funcionar el frontend, el backend debería estar funcionando ya, en caso de que no sea así, estará dando errores continuamente.

Los pasos a seguir son los siguientes:
1. Dentro de la carpeta `Frontend`, usamos el comando: `npm install`
2. Para poner el proyecto a funcionar `npm run dev`

[^1]: En caso de que no se haya instaldo MongoDB como servicio hay que iniciar el servicio manualmente, para hacerlo hay que ir
a la carpeta `bin` donde se ha instaldo y ahí ejecutar el comando `mongod`.
