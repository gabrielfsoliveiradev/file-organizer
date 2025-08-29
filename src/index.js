import fs from 'fs'
import path from 'path'

const userSrcDir = process.argv[2]
const userFinalDir = process.argv[3] || 'files'

if (userSrcDir === undefined){
  console.log('Por favor, informe a pasta de origem e destino')
}else{
  const srcPath = path.resolve(userSrcDir)
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
  const folderName = path.resolve(userFinalDir)
  createDir(folderName)
  for (const ext in extensions) {
    let destinationPath = path.resolve(`${folderName}/${ext.replace('.','')}`)
    createDir(destinationPath)
    console.log(destinationPath, extensions[ext])
    copyFile(extensions[ext], destinationPath)
  }
}

function copyFile(srcPathArr, destinationPath) {
  srcPathArr.forEach((srcPath) => {
    const fileName = path.basename(srcPath)
    const finalPath = path.resolve(destinationPath+'/'+fileName)
      fs.copyFileSync(srcPath, finalPath)
  })
}

function createDir(folderName) {
  if(!fs.existsSync(folderName)){
    fs.mkdirSync(folderName,{ recursive: true })
  }
}
