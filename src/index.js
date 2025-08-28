import fs from 'fs'
import path from 'path'


fs.readdir('./meus-arquivos', 'utf-8', (err, files) => {
  if (err) throw err
  let extensions = {}
  files.forEach((fileName) => {
    let file = {
      path: path.resolve(fileName),
      ext: path.extname(fileName)
    }

    // Verifica se o objeto ext possui a chave com o nome da extensão, caso não houver ele cria a chave e atriui um array a chave
    if(!extensions[file.ext])  extensions[file.ext] = []
    
    // Adiciona o caminho do arquivo de acordo com a extensão feita
    extensions[file.ext].push(file.path)  
  })

  organizeFiles(extensions)
})

async function organizeFiles(extensions) {
  const folderName = './meus-arquivos-organizados'
  await createFolder(folderName)
  for (const ext in extensions) {
    await createFolder(`${folderName}/${ext}`)
  }
}

async function createFolder(folderName) {
  await fs.promises.mkdir(folderName, (err) => {
    if (err){
      console.log(`Não foi possível criar a pasta ${folderName}`)
      throw err 
    } 
    console.log(`Pasta ${folderName} criada`)
  })
}
