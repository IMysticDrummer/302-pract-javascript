# PRÁCTICA INTRODUCCIÓN JS
Por *Iván García Rodríguez*
## EuroWomen's Cup Simulator

### Premisas de la fase eliminatoria (Obligatoria) --> Realizada
>La práctica trata de realizar un simulador de la competición de la Euro Women's Cup.  
>La parte básica de este programa debe simular el campeonato desde los cuartos de final, hasta la final.  
>Se debe indicar toda la información por la consola.  
>No puede haber empates. En caso de empate se debe seguir jugando hasta que un equipo gane.  
>Los equipos que hayan partido desde el mismo grupo no se pueden volver a enfrentar hasta la final.  
>Los equipos ganadores de la semifinal se enfrentarán en la final, mientras que los perdedores se enfrentarán por el tercer puesto.

### Premisas de la fase de grupos (Opcional) --> Realizada
>Serán 16 equipos repartidos en 4 grupos, nombrados con las letrs de la A a la D.  
>Los equipos serán repartidos de forma aleatoria.  
>Por cada grupo se juega una liga de 1 sola vuelta, en formato todos contra todos.  
>Pasarán los dos primeros de cada grupo.

>### Restricciones
>>La victoria representará 3 puntos, el empate 1 y la derrota 0.  
>>La clasificación sigue los siguientes criterios:
>>>Los equipos se ordenan por número de puntos descendente.  
>>>En caso de empate irá primero el que mayor diferencia de goles a favor y en contra tenga.  
>>>En caso de la misma diferencia de goles, se clasifican por orden alfabético.  
>>>Al arrancar el programa se debe mostrar la info de equipos por cada grupo (Nombre del grupo, y debajo los equipos, uno por línea).  
>>>La asiganción de equipos al grupo se realizará de manera aleatoria.  
>>>Anuncio del comienzo del torneo.  
>>>Mostrar por jornada los resultados de los partidos, y la clasificación de cada grupo.  
>>>Continuar con la fase de eliminatorias.

## Ejecución del programa
>Decargarlos archivos del repositio [302-pract-javascript](https://github.com/IMysticDrummer/302-pract-javascript).
>>También puedes clonar el repositorio.  
>Ejecutar el archivo index.js con node: `node index.js`.  


## Notas del desarrollo
- El código está desarrollado bajo ES6, permitiendo las llamadas entre ficheros con import y export.  
Por ello asegúrate de que tienes node configurado para la utilización de ECMA6, y **no** common.js
- Para la parte de la liga, se ha utilizado parte del código explicado en clase, aunque la mayor parte es desarrollo propio.  
- He creado una clase específica **Team** que permite configurar y guardar las estadísticas. En nuestro caso podríamos generar una clase padre más simple, y crear específicamente un *footballTeam*.  
- Para el desarrollo de mi programa, he utilizado sobre todo arrays, lo que me permite una manipulación rápida y más concisa, para el caso de uso y restricciones de la práctica.
> - Por ejemplo, para pasar los ganadores de una fase a otra, utilizo un array de *Team*.
> - Los dos primeros objetos *team* del array son el campeón y subcampeón del primer grupo. Los dos siguientes son el campeón y subcampeón del segundo grupo, etc...
- Durante la práctica he intentado utilizar diferentes tipos de construccones para hacer las mismas cosas.
> - Como ejemplo, he creado clases de la forma más tradicional, pero también he usado una función constructora directamente para la clase *Team*.
- En las clases he tendido a hejar dentro del cuerpo de la clase el constructor, y sólo aquellas funciones que sirven para configurar de forma inicial los atributos/propiedades de la clase. El resto de métodos los he atacado directamente al prototype.
- En la parte de grupos he implementado lanzamientos de error (throws) en caso de que se cambien las configuraciones de la liga, y no pueda repartir los grupos.
No está implementado el control y funcionamiento con grupos de equipos impares (con descansos)


**Espero que lo disfrutes**