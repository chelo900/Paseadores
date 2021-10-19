import React from 'react'

function Preferencias({preferencias}) {
    let inicio = preferencias.comienzo_jornada?.slice(0,-3)
    let final = preferencias.fin_jornada?.slice(0,-3)
    return (
        
        <div>
            {
                preferencias.dias_trabajo === "LV" ? <p>De Lunes a Viernes</p> : 
                preferencias.dias_trabajo === "LD" ? <p>De Lunes a Domingo</p> : <p>Sabados y Domingos</p>
            }
            
            <p>De {inicio}</p>

            a {final}
            <p>paseos de {preferencias.duracion_paseos} horas</p> 
            <p>cantidad de perros por paseo {preferencias.perros_por_paseo}</p>

            
            
        </div>
    )
}

export default Preferencias
