// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

var androidpdfviewer = require('de.marcelpociot.androidpdfviewer');
Ti.API.info("module is => " + androidpdfviewer);

var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function(){
   var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "sample2.pdf" );
   f.write(this.responseData);
   var pdfView = androidpdfviewer.createView({
		top: 0,
		left: 0,
		file: f.getNativePath()
	});
	pdfView.addEventListener("pageChanged",function(e)
	{
		alert("Page changed: "+ e.page + " / "+ e.pageCount);
	});
	pdfView.addEventListener("loadComplete", function(e)
	{
		alert( "Load completed with num pages: " + e.numPages );
	});
	win.add(pdfView);

};
xhr.open('GET','http://www.ancestralauthor.com/download/sample.pdf');
xhr.send();

win.open();