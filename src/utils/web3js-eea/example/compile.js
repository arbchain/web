const path = require("path")
const fs = require('fs')
const solc = require('solc')

function compile(dir, file) {
    const fileToCompile = path.join(dir, file)
    console.log(`Compiling solidity file: ${fileToCompile}`)
    let code = fs.readFileSync(fileToCompile).toString()

    let input = {
        language: 'Solidity',
        sources: {
            [fileToCompile]: {
                content: code
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };


    let compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
    console.log(compiledCode)

    for (let contractName in compiledCode.contracts[fileToCompile]) {

        const contractByteCode = compiledCode.contracts[fileToCompile][contractName].evm.bytecode.object
        // Write BIN data to a bin file' .
        fs.writeFile(path.join(dir , contractName + '.bin'), contractByteCode, (err) => {

            console.log(`Writing Bytecode to: ${path.join(dir , contractName + '.bin')} `)
            if (err) throw err;
        })

        const contractABI = JSON.stringify(compiledCode.contracts[fileToCompile][contractName].abi)
        // Write ABI data to a JSON file' .
        fs.writeFile(path.join(dir , contractName + '.json'), contractABI, (err) => {

            console.log(`Writing ABI to: ${path.join(dir , contractName + '.json')} `)
        //     In case of a error throw err.
            if (err) throw err;
        })



    }
}

const dirPath = process.argv.slice(2)[0];
console.log(`Parsing the directory ${dirPath}`)
let solidityFiles = []
fs.readdirSync(dirPath).forEach(file => {if(file.match(/.*.sol$/)) { solidityFiles.push(file)}})
solidityFiles.forEach(file => compile(dirPath, file))
