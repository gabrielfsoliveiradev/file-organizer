import fs from 'fs'
import path from 'path'

const userFolder = process.argv[2]
if (userFolder === undefined){
  console.log('Por favor, informe a pasta de origem')
}else{
  const srcPath = path.resolve(userFolder)
  fs.readdir(srcPath, 'utf-8', (err, files) => {
    if (err) throw err
    let extensions = {}
    files.forEach((fileName) => {
      let file = {
        path: path.resolve(srcPath, fileName),
        ext: path.extname(fileName)
      }

      // Verifica se o objeto ext possui a chave com o nome da extensão, caso não houver ele cria a chave e atriui um array a chave
      if(!extensions[file.ext])  extensions[file.ext] = []
      
      // Adiciona o caminho do arquivo de acordo com a extensão feita
      extensions[file.ext].push(file.path)  
      })

    organizeFiles(extensions)
  })
}

function organizeFiles(extensions) {
  const folderName = path.resolve('./meus-arquivos-organizados')
  createFolder(folderName)
  for (const ext in extensions) {
    let destinationPath = `${folderName}/${ext.replace('.','')}`
    createFolder(destinationPath)
    copyFile(extensions[ext], destinationPath)
  }
}

function copyFile(srcPathArr, destinationPath) {
  srcPathArr.forEach((srcPath) => {
    const fileName = path.basename(srcPath)
    const finalPath = destinationPath+'/'+fileName
      fs.copyFileSync(srcPath, finalPath)
  })
}

function createFolder(folderName) {
  if(!fs.existsSync(folderName)){
    fs.mkdirSync(folderName,{ recursive: true })
  }
}
