/****** AJAX Callback ******/
let userInfo = "";

$.ajax({
  // get 12 random employees from the random user api
  url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,email,location,dob,cell,picture',
  dataType: 'json',
  success: function(data) {
	// for each user, add info to userInfo variable
	$.each(data.results, (i, user) => {
		userInfo += `<div class="user">
			<img src="${user.picture.large}">
			<ul>
				<li class="name">${user.name.first} ${user.name.last}</li>
				<li class="email">${user.email}</li>
				<li class="city">${user.location.city}</li>
				<hr class="hidden">
				<li class="cell hidden">${user.cell}</li>
				<li class="address hidden">${user.location.street}<br>${user.location.city}, ${user.location.state} ${user.location.postcode}</li>`;
			//format birthday
			const formatBday = () => {
        let bday = user.dob.date.toString();
				return bday[5] + bday[6] + '/' + bday[8] + bday[9] + '/' + bday[0] + bday[1] + bday[2] + bday[3];
			};
		userInfo +=	`<li class="birthday hidden">Birthday: ${formatBday()}</li>
			</ul>
		</div>`;
	});

	// append the user info to the document
	$('#main').append(userInfo);
  }
});


/****** Modal Window ******/
$modal = $('#modal');
$modalContent = $('#modal-content');

// hide the modal and modal content divs by default
$modal.hide();
$modalContent.hide();

// when an image is clicked show the modal window and insert that user's content
$(document).on('click', '.user', function(event) {
	// add the class 'current-user' to the clicked user's div
	if(event.target.nodeName == 'DIV') {
		event.target.className += ' current-user';
	} else if(event.target.nodeName === 'LI') {
		event.target.parentNode.parentNode.className += ' current-user';
	} else {
		event.target.parentNode.className += ' current-user';
	}

	// clone the current user div and add it to the modal
	$('.current-user').clone().appendTo($modalContent);
	// change the clone's class to 'modal-user'
	$('#modal-content .current-user').attr('class', 'modal-user');
	// remove the hidden classes for the additional user information
	$('#modal-content .hidden').removeClass('hidden');

	//show the modal
	$modal.show();
	$modalContent.show();
});

// When the X is clicked, close the modal window
$('#close').on('click', function() {
	$('.current-user').removeClass('current-user');
	$('.modal-user').remove();
	// hide the modal
	$modal.hide();
	$modalContent.hide();
});
