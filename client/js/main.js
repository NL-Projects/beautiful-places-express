window.onload = getExistingLocations;

function getExistingLocations() {
  axios
    .get("http://localhost:3000/locations")
    .then((res) => {
      var topNav = document.getElementById("topnav");
      var locationInfo = document.createElement("div");

      locationInfo.classList.add("info_text");
      res.data.forEach((location) => {
        var a = document.createElement("a");
        a.onclick = loadLocation;
        a.innerHTML = location.name;
        topNav.appendChild(a);
        //   var p = document.createElement("p");
        //   var text = document.createTextNode(location.text[i]);
        //   p.appendChild(text);
        //   resDiv.appendChild(document.createElement("br"));
        //   var img1 = document.createElement("img");
        //   img1.src = location.imageURL[i];
        //   img1.classList.add("floatRight");
        //   var img2 = document.createElement("img");
        //   img2.src = location.imageURL[i + 1];
        //   img2.classList.add("floatRight");
        //   resDiv.append(p, img1, img2);
      });
    })
    .catch((err) => console.log(err));
}
/**
 * to make this function work, use e.srcElement.innerHtml to get location name,
 * edit the api to get location by name instead of id, then pass the location to 
 * a new function which will build the page.
 *
 */
function loadLocation(e) {
    console.log(e.srcElement.innerHTML);
//   let resultDiv = document.createElement("div");
//   for (var i = 0; i < location.imageURL.length; i++) {
//     let p = document.createElement("p");
//     let text = document.createTextNode(location.text[i]);
//     p.appendChild(text);
//     resultDiv.appendChild(document.createElement("br"));
//     let img1 = document.createElement("img");
//     img1.src = location.imageURL[i];
//     img1.classList.add("floatRight");
//     let img2 = document.createElement("img");
//     img2.src = location.imageURL[i + 1];
//     img2.classList.add("floatRight");
//     resultDiv.append(p, img1, img2);
//   }
//   document.getElementById("container").innerHTML = resultDiv.innerHTML;
}
