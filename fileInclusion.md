# File Inclusion

### A class named FileInclusion is taken.

### **Explanation**

* **readFile()** -> this is the function which is primarily used to read data of a specific file.
* **appendFile()** -> this is the function which is primarily used to append the data to the '*dest.txt*'.
* **processFile()** -> this function is used to append the file into this.processedFiles array and checks for the import statement. In this function, recursion occurs when the import statement is present in the particular file.
* **mainCode()** -> this function is used to empty the destination file and calls the processFile() function. <br>
* **executeCode()** -> this function is used to take source file and destination file dynamically.
<br>
Now, an object is created in the following way and gets executionCode() function accessible. <br>
<br>
var fileInclusion = new FileInclusion(); <br>
fileInclusion.executionCode();

### **Code Structure**

```

//require fs and prompt-sync

class FileInclusion {
    constructor() {
        this.processedFiles = [];
    }
    readFile(file) {
            //reads a file using readFileSync() function and returns line data
    }
    appendFile(path, content) {
            //appends the data to the given destination path using appendFileSync() function
    }
    processFile(file, destination) {
      
        //adds the file to this.processedFiles array

        let lines = this.readFile(file);
        for (let line of lines) { //check each line of mentioned file
            if (line.startsWith('import')) {
              //stores the fileName in required manner in variable name importedFile.
                this.processFile(importedFile, destination); //Using recursion again calls processFile function
           } else {
                this.appendFile(destination, line + '\n'); //
                appends the file content to destination file if import not present.
            }
        }
    }
    mainCode(sourceFile, destinationFile) {
        fs.writeFileSync(destinationFile, '');//initially emptying destination file.
        this.processFile(sourceFile, destinationFile);
    }
    executeCode() {
        let sourceFile = prompt('Enter source file:'); 
        let destinationFile = prompt('Enter destinaton file:');
        //Giving source file and destination files dynamically
        this.mainCode(sourceFile,destinationFile);
    }
}
let fileInclusion = new FileInclusion();
fileInclusion.executeCode();

```




