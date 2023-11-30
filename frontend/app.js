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
              return;
              case "Joe":
                fetchJson('user2');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user2';
              return;
              case "John":
                fetchJson('user3');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user3';
              return;
              case "Tanish Gaglani":
                fetchJson('user4');
                document.getElementById('thoushallnotpass').classList.add('hidden');
                currentUser = 'user4';
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
  let url = '/' + user + '.json';
   fetch(url, {
    method: 'GET'
  }
    )
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
     data.forEach(item => {
      appendCard(item);
    });
  })
}

function switchUser(newUser) {
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
    <div class="bg-stone-300 p-2 m-2 w-full h-fit">
      <button onclick="copyToClipboard('${cbVals}')" class="bg-stone-300 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fa-regular fa-copy"></i></button>
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
    <div class="bg-stone-300 p-2 m-2 w-full h-fit">
      <button onclick="list.copyToClipboard('${formValues}')" class="bg-stone-300 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fa-regular fa-copy"></i></button>
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

document.getElementById('btn-delAll').addEventListener('click', clearAll(currentUser));

function clearAll(user) {
  const userid = switch (user)
    fetch('/deleteAll', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  body: {"user": userid},
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
}
