// async function getSettings() {
//     return await fetch('/settings')
//         .then(response => response.json())
//         .catch(error => {
//             console.log('Ocorreu um erro de comunicação com o servidor:')
//             console.log(error)
//             return null
//         })
// }

// async function getApiBasicAddress() {
//     return await fetch('/settings')
//         .then(response => response.json())
//         .then(data => data.api.basicAddress)
//         .catch(error => {
//             console.log('Ocorreu um erro de comunicação com o servidor:')
//             console.log(error)
//             return null
//         })
// }