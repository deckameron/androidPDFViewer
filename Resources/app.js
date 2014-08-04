var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var progressBar = Ti.UI.createProgressBar({max: 1, min: 0, value: 0, visible: false, width: "90%", height:"5%", zIndex:2, top:'40%'});
win.add(progressBar);
var androidpdfviewer = require('de.marcelpociot.androidpdfviewer');

var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "sample2.pdf" );
f.deleteFile();
if(f.exists()){
	Ti.API.info('exists');
	var pdfView = androidpdfviewer.createView({
		top: 0,
		left: 0,
		file: f.getNativePath()
	});
	win.add(pdfView);
}else{
	Ti.API.info('not exists');
	var xhr = Titanium.Network.createHTTPClient({
		ondatastream: function(e){
			progressBar.show();
			progressBar.value = e.progress;
		},
		onload: function(e){
			progressBar.hide();
			f.write(this.responseData);
			var pdfView = androidpdfviewer.createView({
				top: 0,
				left: 0,
				file: f.getNativePath()
			});
			win.add(pdfView);
		},
		onerror: function(e){
			alert('error download。');
		}
	});
	
	xhr.open('GET','http://hen.trcorp.cho88.com/Hen5_Part_A.pdf');//http://www.technosquare.co.jp/freepaper/hen/hen201405.pdf
	xhr.send();
}

win.open();
f.deleteFile();