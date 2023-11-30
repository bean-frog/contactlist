const list = (function() {
	return {
		updateLS: function(json, overwrite) {
			switch(overwrite) {
			case true:

			break;
		default:
			localStorage.setItem('list', JSON.stringify(JSON.parse(json)))
			break;
			}
		},
		copyToClipboard: function(args) {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(args)
			} else {
				window.alert('Something went wrong oh nooooo')
			}
		},
		add: async function(){
			 const {
        value: formValues
    } = await Swal.fire({
        title: 'New Contact',
        html: '<input id="swal-input1" class="text-black swal2-input" placeholder="Name">' +
            '<input id="swal-input2" class="text-black swal2-input" placeholder="Phone Number">' +
            '<input id="swal-input3" class="text-black swal2-input" placeholder="Address">'
            ,
        focusConfirm: false,
        preConfirm: () => {
            const input1 = document.getElementById('swal-input1').value;
            const input2 = document.getElementById('swal-input2').value;
            const input3 = document.getElementById('swal-input3').value;
            if (input1.trim() === '' || input2.trim() === '' || input3.trim === '') {
                Swal.showValidationMessage('all inputs are required');
                return false;
            }
            return [input1, input2, input3];
        }
    });
    document.getElementById('list').innerHTML += `
				<div class="bg-stone-300 p-2 m-2 w-full h-fit">
					<button onclick="list.copyToClipboard('${formValues}')" class="bg-stone-300 m-2 hover:scale-[1.01] active:scale-[0.95]"><i class="fa-regular fa-copy"></i></button>
					<h1 class="text-xl text-black">${formValues[0]}</h1>
					<h1 class="text-l text-stone-700">Phone: ${formValues[1]}</h1>
					<h1 class="text-l text-stone-700">Address: ${formValues[2]}</h1>
				</div>
    `
		}
	}
})();