//   Sidenav Controller
function showSection(sectionId) {
  var sidenav = document.getElementById("sidebar");
  var sideList1 = document.getElementById("sideList1");
  var sideList2 = document.getElementById("sideList2");
  var sideList3 = document.getElementById("sideList3");
  var sideList4 = document.getElementById("sideList4");
  sidenav.style.display = "block";
  // Hide all sections
  var sections = document.getElementsByTagName("include");
  for (var i = 0; i < sections.length; i++) {
    sidenav.style.display = "block";
    sections[i].style.display = "none";
    sideList1.classList.remove("activeTab");
    sideList2.classList.remove("activeTab");
    sideList3.classList.remove("activeTab");
    sideList4.classList.remove("activeTab");
  }
  console.log("section id check");
  console.log(sectionId);
  if (sectionId == "section1") {
    sideList1.classList.add("activeTab");
  } else if (sectionId == "section2") {
    sideList2.classList.add("activeTab");
  } else if (sectionId == "section3") {
    sideList3.classList.add("activeTab");
  } else {
    sideList4.classList.add("activeTab");
  }
  // Show the selected section
  var section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
  }
}
