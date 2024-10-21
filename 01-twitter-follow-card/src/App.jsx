import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    { id: 1, isFollowing: false, userName: 'dimLeyd', name: 'dimension Leyd!', platform: 'deviantart'},
    { id: 2, isFollowing: false, userName: 'jackConigliomannaro', name: 'Alessia Mazzei', platform: 'deviantart'},
    { id: 3, isFollowing: false, userName: 'junisek', name: 'Junisek', platform: 'deviantart'},
    { id: 4, isFollowing: false, userName: 'bh-stables', name: 'BH-Stables', platform: 'deviantart'},
    { id: 5, isFollowing: false, userName: 'TacuaSVXD', name: 'TacuaPossum', platform: 'x'}
]


export function App (){
    //se pueden pasar funciones como props al componente
    // const formatUserName = (userName) => `@${userName}`;
    //este es un ejemplo para demostrar que tambien se pueden pasar elementos al componente
    //const formattedUserName = <span>@dimLeyd</span>

    //tambien podemos pasar todas las props en un solo objeto, pero no es buena practica
    // const dimLeyd = { initialIsFollowing:false, userName: 'leyd_comms', platform: 'x', formatUserName: formatUserName}

    return (
        //los signos vacios es lo mismo que decir React.Fragment, 
        //recordando que solo se puede renderizar un solo elemento
        <div className='App'>
            {
                users.map(({id, userName, name, platform, isFollowing})=>(
                    <TwitterFollowCard 
                    key={id}
                    initialIsFollowing={isFollowing} 
                    platform={platform} 
                    userName={userName}>
                        {name}
                    </TwitterFollowCard>
                ))
            }
            {/* <TwitterFollowCard {...dimLeyd}>Leyd Comms</TwitterFollowCard> */}
        </div>
    )
}