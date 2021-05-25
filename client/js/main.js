window.onload = getExistingLocations;

var locationReference = {};

function getExistingLocations() {
  axios
    .get("http://localhost:3000/locations")
    .then((res) => {
      var topNav = document.getElementById("topnav");
      var locationInfo = document.createElement("div");
      locationInfo.classList.add("info_text");
      locations = res.data;
      res.data.forEach((location) => {
        var a = document.createElement("a");
        a.onclick = renderLocation;
        a.innerHTML = location.name;
        locationReference[location.name] = location._id;
        topNav.appendChild(a);
      });
    })
    .catch((err) => console.log(err));
}

async function renderLocation(e) {
  let location = await getLocationById(
    locationReference[e.srcElement.innerHTML]
  );
  let resultDiv = document.createElement("div");
  for (var i = 0; i < location.imageURL.length; i++) {
    let p;
    if (i % 2 == 0) {
      p = document.createElement("p");
      let text = document.createTextNode(location.text[i / 2]);
      p.appendChild(text);
    }
    resultDiv.appendChild(document.createElement("br"));
    let img1 = document.createElement("img");
    img1.src = location.imageURL[i];
    img1.classList.add("floatRight");
    let img2 = document.createElement("img");
    img2.src = location.imageURL[i + 1];
    img2.classList.add("floatRight");
    resultDiv.append(p, img1, img2);
  }
  document.getElementById("container").innerHTML = resultDiv.innerHTML;
}
async function getLocationById(id) {
  let location = await axios
    .get("http://localhost:3000/locations/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return location;
}
