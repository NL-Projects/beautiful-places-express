window.onload = getExistingLocations;

var locationReference = {};
var locs = [];

async function getExistingLocations() {
  await axios
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
  document.getElementById("addlocation").style.display = "none";
  document.getElementById("container").style.display = "block";
  document.getElementById("removelocation").style.display = "none";
  let location = await getLocationById(
    locationReference[e.srcElement.innerHTML]
  );
  let resultDiv = document.createElement("div");
  for (var i = 0; i < location.text.length; i++) {
    let p;
    p = document.createElement("p");
    let text = document.createTextNode(location.text[i]);
    p.appendChild(text);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(p);
    if (location.imageURL[2 * i] != null) {
      let imgContainer = document.createElement("div");
      imgContainer.classList.add(".img_container");
      let img1 = document.createElement("img");
      img1.src = location.imageURL[2 * i];
      img1.classList.add("floatRight");
      let img2 = document.createElement("img");
      img2.src = location.imageURL[2 * i + 1];
      img2.classList.add("floatRight");
      imgContainer.append(img1, img2);
      resultDiv.appendChild(imgContainer);
    }
  }
  document.getElementById("container").innerHTML = resultDiv.innerHTML;
}

async function getLocationById(id) {
  return await axios
    .get("http://localhost:3000/locations/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

async function handleUploadedImages() {
  let newLocationName = document.getElementById("name").value;
  var form = document.getElementById("sub-form");
  var fd = new FormData(form);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  var imageURL = [];
  await axios
    .post("http://localhost:3000/upload", fd, config)
    .then((res) => {
      imageURL = res.data;
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  await axios.patch(
    "http://localhost:3000/locations/" + locationReference[newLocationName],
    { imageURL: imageURL }
  );
}

function showForm() {
  document.getElementById("addlocation").style.display = "block";
  document.getElementById("container").style.display = "none";
  document.getElementById("removelocation").style.display = "none";
}

//show the delete box - its not a box as well as it not a form
function deletebox() {
  document.getElementById("addlocation").style.display = "none";
  document.getElementById("removelocation").style.display = "block";
  document.getElementById("container").style.display = "none";

  let selectMenu = document.getElementById("location-select");
  for (var key in locationReference) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.innerHTML = key;
    selectMenu.appendChild(opt);
  }
}

//only a test for get method
function removeLocation() {
  let locationToDelete = document.getElementById("location-select").value;
  axios
    .delete(
      "http://localhost:3000/locations/" + locationReference[locationToDelete]
    )
    .then((res) => {
      console.log(res);
      document.getElementById("container").innerHTML = `<h1>${res}</h1>`;
    })
    .catch((err) => console.log(err));
}
