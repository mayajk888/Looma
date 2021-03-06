#! /Applications/AMPPS/mongodb/bin/mongo
// script to change most text-editor created text to the smallest font size
// this should only be run once, before installing the new text editor (be sure to make a backup of the database first)
// provide this as a command-line argument to the mongo binary
//
// filename: Looma/looma shell scripts/fix-text-sizes.js
//
// by Akshay July 2017
//
db = db.getSiblingDB('looma')

var activitycursor, textcursor;

print('db is ' + db);
print('');

count = 0;
textcursor = db.text_files.find();

function replace(string, x, y) {
    while (string.indexOf(x) != -1) {
        string = string.replace(x, y);
    }
    return string;
}

while (textcursor.hasNext()) {
    var doc = textcursor.next();
    print ('Fixing ' + doc.dn);

    html = doc.data
    html = replace(html, 'size="6"', 'size="4"');
    html = replace(html, 'size="7"', 'size="4"');
    html = replace(html, 'size="8"', 'size="4"');
    html = replace(html, 'font-size: -webkit-xxx-large;', 'font-size: 4;');

    print(doc.data)
    doc.data = html

    db.text_files.update({"dn": doc.dn}, doc);

};
