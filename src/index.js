import fs from 'fs'
import path from 'path'


fs.readdir('./meus-arquivos', 'utf-8', (err, files) => {
  if (err) throw err
  let ext = {}
  files.forEach((fileName) => {
    let file = {
      path: path.resolve(fileName),
      ext: path.extname(fileName)
    }

    // Verifica se o objeto ext possui a chave com o nome da extensão, caso não houver ele cria a chave e atriui um array a chave
    if(!ext[file.ext])  ext[file.ext] = []
    
    // Adiciona o caminho do arquivo de acordo com a extensão feita
    ext[file.ext].push(file.path)  
  })
})
