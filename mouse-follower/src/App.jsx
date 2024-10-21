//en este proyecto usaremos el hook useEffect, para controlar la ejecucion de
//codigo arbitrario que cambie segun las dependencias
import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // este efecto se ejecuta cada vez que cambia la variable enable
  // entonces se suscribe al evento 'pointermove' para obtener la posicion del puntero
  // y posteriormente hacer que nuestro elemento (un div) se mueva hacia esa posicion
  // siguiendo el puntero
  useEffect(() => {
      const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    //evaluamos si el estado(enabled) esta activo para anadir la suscripcion
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup: en esta parte limpiamos lo que el efecto hizo al ejecutarse
     // cleanup method se hace retornando una funcion
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // este es un ejemplo donde agregamos un segundo efecto al mismo estado (enabled)
  // podemos agregar cuantos efectos necesitemos, y con las dependencias que queramos
  // en este caso lo unico que hace es hacer el la clase 'no cursor' sea agregada y quitada
  // y esa clase en css le dice al puntero que no se despliegue
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  // la propiedad css transform es la que se estará modificando al escuchar el cambio de
  // los estados
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguimiento del puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App