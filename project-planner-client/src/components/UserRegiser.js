// import { response } from 'express'
// import React, { useState } from 'react'

// export default function UserRegiser() {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [psw, setPsw] = useState('')


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         let bodyData = {
//             name: name,
//             emailAddress: email,
//             password: psw
//         }
//         try {
//             await fetch('http://localhost:3500/users', {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(bodyData),
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     let userData = {
//                         data
//                     }
//                 })

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         // <section>
//         //     {/* <form onSubmit={handleSubmit}>
//         //         <label>Name
//         //             <input required value={name} type='text' onChange={(e) => setName(e.target.value)}>
//         //             </input>
//         //         </label>
//         //         <label>Email
//         //             <input required value={email} type='email' onChange={(e) => setEmail(e.target.value)}>
//         //             </input>
//         //         </label>
//         //         <label>Password
//         //             <input type='password' value={psw} onChange={(e) => setPsw(e.target.value)}>
//         //             </input>
//         //         </label>
//         //         <button>Sign Up</button>
//         //     </form> */}
//         // </section>
//     )
// }
