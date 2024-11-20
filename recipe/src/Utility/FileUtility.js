export default function getBase64(file, onLoadcallBack, onErrorcallBack) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        onLoadcallBack(reader.result);
    };
    reader.onerror = function (error) {
        onErrorcallBack(error);
    };
 }