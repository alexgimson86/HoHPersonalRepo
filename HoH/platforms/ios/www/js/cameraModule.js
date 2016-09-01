var cameraModule = (function($){

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64 encoded image data
        // console.log(imageData);

        // Get image handle
        //
        var smallImage = document.getElementById('imageTask');

        // Unhide image elements
        //
        smallImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        smallImage.src = "data:image/jpeg;base64," + imageData;
        //sessionStorage.setItem("userAvatar", smallImage.src);
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
        // Uncomment to view the image file URI 
        // console.log(imageURI);

        // Get image handle
        //
        var largeImage = document.getElementById('imageTask');

        // Unhide image elements
        //
        largeImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        largeImage.src = imageURI;
        sessionStorage.setItem("userAvatar", largeImage.src);
    }

    // A button will call this function
    //
    var capturePhoto = function() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 75,
            correctOrientation: true,
            destinationType: destinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 800
        });
    };

    // A button will call this function
    //
    function capturePhotoEdit() {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 75, 
            allowEdit: true,
            correctOrientation: true,
            destinationType: destinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 800
        });
    }

    // A button will call this function
    //
    var getPhoto = function(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 75,
            allowEdit: true,
            correctOrientation: true,
            destinationType: destinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: source,
            targetWidth: 800,
            targetHeight: 800
        });
    };

    // Called if something bad happens.
    // 
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
    function uploadPhoto(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = document.getElementById('emailId').value;

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://www.hallofheroesapp.com/php/uploadPhoto.php", win, fail, options);
        document.getElementById("imageTask").src = sessionStorage.getItem("userAvatar");
    }
 
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
    }
    
    var getPicture = function() {
        capturePhoto();
    };
    
    var startUpload = function() {
        uploadPhoto(sessionStorage.getItem("userAvatar"));
    };
    return { 
        getPicture: getPicture,
        startUpload: startUpload
    };
 }(jQuery));
          