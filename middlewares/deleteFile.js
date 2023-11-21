const { unlink } = require('node:fs');
const path = require('node:path');
function Delete (imagePath){
    // Extract the filename from the file path
    const filename = path.basename(imagePath);
    unlink('./static/uploads/'+filename,(err) => {
        if (err) throw err;
        console.log('successfully deleted ' + filename);
      })
}

module.exports=Delete;

