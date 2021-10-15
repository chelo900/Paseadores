// import React from "react";

// function Paginado ({usersPremiumPerPage, usersPremium, paginado}) { 
//     const pageNum = []
//     for (let i = 1; i <= Math.ceil(usersPremium/usersPremiumPerPage); i++) { 
//         pageNum.push(i)
//     }

//     return (
//         <nav>
//             <ul > 
//                 {pageNum &&
//                     pageNum.map(num => (
//                         <button onClick = {() => paginado(num)}  key = {num} > {num} </button>
//                     ))
//                 }
//             </ul>
//         </nav>
//     )
// }

// export default Paginado;