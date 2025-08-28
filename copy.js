import fs from 'fs'

let origem = "C:\\Users\\gabri\\OneDrive\\Documentos\\GitHub\\file-organizer\\meus-arquivos\\bofebisl.png"
let destino = "C:\\Users\\gabri\\OneDrive\\Documentos\\GitHub\\file-organizer\\bofebisl.png"

fs.copyFileSync(origem, destino)