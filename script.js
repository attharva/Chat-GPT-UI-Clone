document.getElementById('createButton').addEventListener('click', function() {
  createNewLink();
});



document.getElementById('sidebar-toggle').addEventListener('click', function() {
  document.querySelector('.sidebar').classList.toggle('close');
  document.querySelector('.main').classList.toggle('expanded');
});




function createNewLink() {
  const navList = document.querySelector('.menu-items');
  const newLink = document.createElement('li');
  newLink.className = 'item';

  // Increment or set a counter to give a unique number to each link
  window.linkCounter = window.linkCounter || 0;
  window.linkCounter++;

  newLink.innerHTML = `
  <a href="#">Link ${window.linkCounter}</a>
  <button onclick="deleteThisLink(this)">❌</button>
  `;

  // Add the new link to the top of the list
  navList.insertBefore(newLink, navList.firstChild);
  saveLinks();
}

function saveLinks() {
  const links = document.querySelectorAll('.menu-items li');
  const linksData = Array.from(links).map(li => li.textContent.trim());
  localStorage.setItem('navLinks', JSON.stringify(linksData));
}


function loadLinks() {
  const navList = document.querySelector('.menu-items');
  const linksData = JSON.parse(localStorage.getItem('navLinks'));

  if (linksData) {
    linksData.forEach(text => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
      <a href="#">${text}</a>
      <button onclick="deleteThisLink(this)">❌</button>
      `;
      navList.appendChild(li);
    });

    // Set the link counter to the number of loaded links
    window.linkCounter = linksData.length;
  }
}

// Call loadLinks on page load
document.addEventListener('DOMContentLoaded', loadLinks);


function deleteThisLink(button) {
  const li = button.parentNode;
  const navList = document.querySelector('.menu-items');
  navList.removeChild(li);

  // Check if the list is empty and reset the counter if it is
  if (navList.children.length === 0) {
    window.linkCounter = 0;
  }
  // Update localStorage after deletion
  saveLinks();
}



const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
