var currentUser = ''
function checkLogin() {
  let usr = document.getElementById('login-username').value;
  let pw = document.getElementById('login-password').value;
    fetch('/notuserpasswords.json', { // I did not store the user passwords as plaintext in a non secured server. I would never do that because I am the best developer on Earth.
    method: 'GET'
  }
    )
  .then(response => response.json())
  .then(data => {
        if (data[usr] == pw) {
          console.log('ur in');
          console.log(usr)
            switch (usr.trim()) {
              case "Bob":
                fetchJson('user1');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user1';
                updateDelAll();
              return;
              case "Joe":
                fetchJson('user2');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user2';
                updateDelAll();
              return;
              case "John":
                fetchJson('user3');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user3';
                updateDelAll();
              return;
              case "Tanish Gaglani":
                fetchJson('user4');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user4';
                updateDelAll();
              return;
              default:
              return;
            }

        } else {
          alert('wrong password, stop trying to hack ' + usr + "'s account")
        }
    });
  document.getElementById('currentuser').textContent = usr;
  document.getElementById('login-password').value = ''

}
function copyToClipboard(text) {
  if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
      } else {
        window.alert('Something went wrong idk')
      }
}

function fetchJson(user) {
  document.getElementById('list').innerHTML = ''
  let url = '/' + user + '.json';
   fetch(url, {
    method: 'GET'
  }
    )
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    localStorage.setItem('cl-cache', JSON.stringify(data))
     data.forEach(item => {
      appendCard(item);
    });

  })

}

function switchUser(newUser) {
  document.getElementById('search').value = ''
  switch (newUser) {
  case "user1":
    currentUser = 'user1';
    document.getElementById('list'). innerHTML = ``;
    fetchJson('user1')
    return;
  case "user2":
    currentUser = 'user2';
    document.getElementById('list'). innerHTML = ``;
    fetchJson('user2')
    return;
  case "user3":
    currentUser = 'user3';
    document.getElementById('list'). innerHTML = ``;
    fetchJson('user3')
    return;
  case "user4":
    currentUser = 'user4';
    document.getElementById('list'). innerHTML = ``;
    fetchJson('user4')
    return;
  }
}

function appendCard(contactData) {
  let data = JSON.parse(JSON.stringify(contactData));
  let cbVals = [contactData.name,contactData.phone,contactData.email,contactData.address]
  document.getElementById('list').innerHTML += `
    <div class="contact p-2 m-2 w-full bg-stone-300 h-fit relative">
    <button onclick="deleteData('data/${currentUser}.json', '${cbVals}')" class="text-red-500 absolute top-2 right-2 bg-stone-300 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fas fa-trash"></i></button>
      <button onclick="copyToClipboard('${cbVals}')" class="absolute top-2 right-10 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fa-regular fa-copy"></i></button>
      <h1 class="text-xl text-black" onclick="copyToClipboard(this.textContent)">${contactData.name}</h1>
      <h1 class="text-l text-stone-700">Phone: ${contactData.phone}</h1>
      <h1 class="text-l text-stone-700">Email: ${contactData.email}</h1>
      <h1 class="text-l text-stone-700">Address: ${contactData.address}</h1>
    </div>
  `;
};
async function addItem() {
  const {
    value: formValues
  } = await Swal.fire({
    title: 'New Contact',
    html: '<input id="swal-input1" class="text-black swal2-input" placeholder="Name">' +
      '<input id="swal-input2" class="text-black swal2-input" placeholder="Phone Number">' +
      '<input id="swal-input3" class="text-black swal2-input" placeholder="Email">' +
      '<input id="swal-input4" class="text-black swal2-input" placeholder="Address">',
    focusConfirm: false,
    preConfirm: () => {
      const input1 = document.getElementById('swal-input1').value;
      const input2 = document.getElementById('swal-input2').value;
      const input3 = document.getElementById('swal-input3').value;
      const input4 = document.getElementById('swal-input4').value;
      if (input1.trim() === '' || input2.trim() === '' || input3.trim() === '') {
        Swal.showValidationMessage('missing a required input');
        return false;
      }
      return [input1, input2, input3, input4];
    }
  });
  if (formValues) {
  document.getElementById('list').innerHTML += `
    <div class="contact p-2 my-2 w-full bg-stone-300 h-fit relative">
      <button onclick="deleteData('data/${currentUser}.json', '${formValues}')" class="text-red-500 absolute top-2 right-2 bg-stone-300 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fas fa-trash"></i></button>
      <button onclick="copyToClipboard('${formValues}')" class="absolute top-2 right-10 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fa-regular fa-copy"></i></button>
      <h1 class="text-xl text-black">${formValues[0]}</h1>
      <h1 class="text-l text-stone-700">Phone: ${formValues[1]}</h1>
      <h1 class="text-l text-stone-700">Email: ${formValues[2]}</h1>
      <h1 class="text-l text-stone-700">Address: ${formValues[3]}</h1>
    </div>
  `;
}

var jsonData = {
  name: formValues[0],
  phone: formValues[1],
  email: formValues[2],
  address: formValues[3]
}


var jsonString = JSON.stringify(jsonData);

var url = '/' + currentUser;

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  body: jsonString,
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

}
document.getElementById('btn-add').addEventListener('click', function () {
  addItem();
});


const deleteData = async (file, userData) => {
  const [name, phone, email, address] = userData.split(',');

  const endpoint = '/delete';
  const requestData = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: file,
      name: name,
      phone: phone,
      email: email,
      address: address,
    }),
  };

  try {
    const response = await fetch(endpoint, requestData);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    fetchJson(currentUser)
  } catch (error) {
    console.error('Error:', error.message);
  }
};
const deleteAllData = async (file) => {

  const endpoint = '/deleteAll';
  const requestData = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: file,
    }),
  };
  try {
    const response = await fetch(endpoint, requestData);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    document.getElementById('list').innerHTML = '';
  } catch (error) {
    console.error('Error:', error.message);
  }
};

document.getElementById('search').addEventListener('input', function () {
  let list = document.getElementById('list');
  let nodes = document.querySelectorAll('.contact');
  let query = this.value.replace(" ", "");
  nodes.forEach(node => {
    let txt = node.innerText.toLowerCase().trim().replace(" ", "");
    if (txt.includes(query)) {
      node.classList.add('bg-emerald-200');
      node.classList.remove('bg-stone-300')
    } else {
      node.classList.remove('bg-emerald-200');
      node.classList.add('bg-stone-300')
    }
    if (query === "") {
      node.classList.remove('bg-emerald-200');
      node.classList.add('bg-stone-300')
    }
  });
  rearrangeNodes();
});
function rearrangeNodes() {
  const list = document.getElementById('list');
  const contacts = Array.from(list.children);
  contacts.sort((a, b) => {
    const hasClassA = a.classList.contains('bg-emerald-200');
    const hasClassB = b.classList.contains('bg-emerald-200');
    if (hasClassA && !hasClassB) {
      return -1;
    } else if (!hasClassA && hasClassB) {
      return 1;
    } else {
      return 0;
    }
  });
  list.innerHTML = '';
  contacts.forEach(contact => list.appendChild(contact));
}
function updateDelAll() {
  if (listener) {
    document.removeEventListener(listener)
  }
var listener = document.getElementById('btn-delAll').addEventListener('click', function() {
  deleteAllData('data/' + currentUser + '.json');
})
}
updateDelAll();