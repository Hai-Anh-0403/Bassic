```javascript
const imageInput = document.getElementById("tour-image");

const preview = document.getElementById("preview");

imageInput.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (file) {

        const imageURL = URL.createObjectURL(file);

        preview.src = imageURL;
    }

});
```
