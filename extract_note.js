
var app = Application.currentApplication()
app.includeStandardAdditions = true

function writeTextToFile(text, file, overwriteExistingContent) {
    try {

        var fileString = file.toString()
        var openedFile = app.openForAccess(Path(fileString), {
            writePermission: true
        })

        // Clear the file if content should be overwritten
        if (overwriteExistingContent) {
            app.setEof(openedFile, {
                to: 0
            })
        }
        app.write(text, {
            to: openedFile,
            startingAt: app.getEof(openedFile)
        })

        app.closeAccess(openedFile)
        return true
    } catch (error) {

        try {
            app.closeAccess(file)
        } catch (error) {
            console.log(`Couldn't close file: ${error}`)
        }
        return false
    }
}

var notes = Application("Notes")

var counter = 0;

while (counter < notes.notes.length) {
    var creation_date = notes.notes[counter].creationDate()
    var name = notes.notes[counter].name()
    var content = notes.notes[counter].body()

    var desktopString = app.pathTo("desktop").toString()
    var file = `${desktopString}/${name}.txt`
    writeTextToFile(content, file, true)

    counter++



}
