const fs = require("fs");
const prompt = require('prompt-sync')();

class FileInclusion {
    constructor() {
        this.processedFiles = [];
    }

    /**
     * It is used to read file
     * @param  file 
     * @returns 
     */
    // TODO : just add a little bit doc to this file
    readFile(file) {
        try {
            let data = fs.readFileSync(file, 'utf8');
            return data.split(/\r?\n/).map(name => name.trim());
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * It is used to append data to the destination file
     * @param  file 
     * @returns 
     */
    appendFile(path, content) {
        try {
            fs.appendFileSync(path, content);
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * It is used to process the file by checking the presence of import statements
     * @param  file 
     * @returns 
     */
    processFile(file, destination) {

        this.processedFiles.push(file);
        let lines = this.readFile(file);

        for (let line of lines) {
            if (line.startsWith('import')) {
                let curr = /'/g;
                let importedFile = line.split(' ')[1].replace(curr, ''); 
                this.processFile(importedFile, destination);
            } else {
                this.appendFile(destination, line + '\n');
            }
        }
    }

    /**
     * It is used to empty the destination file and calls processFile() function
     * @param  file 
     * @returns 
     */
    mainCode(sourceFile, destinationFile) {
        fs.writeFileSync(destinationFile, '');

        this.processFile(sourceFile, destinationFile);
    }

    /**
     * It is used to take source file and destination file dynamically
     * @param  file 
     * @returns 
     */
    executeCode() {
        let sourceFile = prompt('Enter source file:');
        let destinationFile = prompt('Enter destinaton file:');
        this.mainCode(sourceFile,destinationFile);
    }
}

let fileInclusion = new FileInclusion();

fileInclusion.executeCode();
