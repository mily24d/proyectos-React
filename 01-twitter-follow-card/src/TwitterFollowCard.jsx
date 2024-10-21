import { useState } from "react";

export function TwitterFollowCard(
    { /*formattedUserName,*/ children, platform, userName, initialIsFollowing}){
        
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const text = isFollowing? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing? 'tw-followCard-button is-following' : 'tw-followCard-button'
    
    //este es un hook que maneja el estado del componente
    //esta es la manera larga de escribirlo, pero se puede escribir en una sola linea
    // const state = useState(false)
    // const isFollowing = state[0]
    // const setIsFollowing = state[1]
    // se pasa el valor false como valor por defecto para el estado

    const handleClick = ()=> {
        setIsFollowing(!isFollowing)
    }
    return(
        //asi se usan los estilos css en linea (recordar utilizar camelCase para los nombres de los estilos)
        <article className='tw-followCard' style={{ color: '#fff' }}>
            <header className='tw-followCard-header'>
                <img
                className='tw-followCard-avatar'
                alt={`Avatar del usuario ${userName}`} 
                src={`https://unavatar.io/${platform}/${userName}`}/>
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-info-username'>@{userName}</span>
                    {/* {formattedUserName} */}
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
        
    )
}