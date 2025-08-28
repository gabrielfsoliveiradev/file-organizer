import fs from 'fs'


fs.readdir('./meus-arquivos', 'utf-8', (err, files) => {
  if (err) throw err
  console.log(files)
})
