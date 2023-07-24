# Sistema de gestion | REACT | CRUD 

## Índice

- [Instalación](#instalación)
  - [Requisitos](#Requisitos)
  - [Pasos](#Pasos)
- [Usos](#usos)
  - [Inicio de sesión](#inicio-de-sesión)
  - [Sesión iniciada](#sesión-iniciada)
  - [Vista General](#vista-general)
  - [Datos](#datos)
  - [Visualizacion Individual](#visualización-individual)
  - [Edit 1](#edit-1)
  - [Edit 2](#edit-2)
  - [Crear Item](#crear-item)
  - [Borrar 1](#borrar-1)
  - [Borrar 2](#borrar-2)
- [Estructura de item individual](#estructura-de-item-individual)

---

Este proyecto es un desarrollo de un sistema de gestión de inventarios que se conecta a una `API` publica proporcionada por **_enerBit_**, la aplicación cuenta con dos pantallas principales (Login , Admin) con persistencia de dato en `localStorage` y gestión todos los servicios `CRUD`, además de ser **_responsive_** para el ingreso en varios dispositivos.

La aplicacion esta desplegada en una instancia gratuita de netlify y puede acceder desde [aquí](https://main--fancy-brigadeiros-ed396f.netlify.app/)

### [Click aqui para ir a la API](https://ops.enerbit.dev/learning/docs#/)

## **Instalación**

---

### _requisitos_

El proceso de instalación requiere de acceder al gestor de paquetes npm actualizado, es necesario mínimamente tener disponible la versión `9.2.0`.

### _pasos_

El paso inicial es ingresar a la terminal de comando bash, posteriormente escribir los siguientes comandos

1.     npm i

2.     npm start

## **Usos**

---

### **Inicio de sesión**

    Usuario administrador a ingresar

| username | password |
| -------- | -------- |
| admin    | admin    |

_Escritos tal cual_

### **Sesión iniciada**

El paso inicial es ingresar a la terminal de comando bash, posteriormente escribir los siguientes comandos:

## Vista general

![vistaGeneral](https://i.imgur.com/e3P4vBZ.png)

## Datos

![datos](https://i.imgur.com/w1OkT9u.png)

## Visualización individual

![visualizacion-individual](https://i.imgur.com/BS9VceR.gif)

## Búsqueda

![Búsqueda](https://i.imgur.com/dZpxkuu.gif)

## Edit 1

![Edi1](https://i.imgur.com/jtK6iTg.gif)

## Edit 2

![Edi2](https://i.imgur.com/MuZrCzH.gif)

## Crear Item

![Create](https://i.imgur.com/MuZrCzH.gif)

## Borrar 1

![Delete1](https://i.imgur.com/GBnUehh.gif)

## Borrar 2

![Delete2](https://i.imgur.com/kkOMgIM.gif)

# Estructura de item individual

Los objetos recuperados de la api tienen la siguiente estructura `JSON` :

    {
    serial: string
    connection_type: string
    storage_system: string
    condition: string
    owner: string
    location: string
    manufacturer: string
    purchase: string
    i_max: number
    i_b: number
    i_n: number
    seals: number
    }

---

[Volver al inicio](#índice)
