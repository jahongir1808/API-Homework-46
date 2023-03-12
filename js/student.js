const student_rows = document.querySelector('.student-rows');
const marriedBtn = document.querySelector('.mm');
const unmarriedBtn = document.querySelector('.nm');

function getStudentCard({
	createdAt,
	firstName,
	lastName,
	avatar,
	birthday,
	phoneNumber,
	email,
}) {
	const phonenumber = phoneNumber;
	const regex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
	if (regex.test(phoneNumber)) {
		alert("To'g'ri");
	} else {
		alert("Noto'g'ri");
	}
	return `
         <div class="student-row">
        <p>${createdAt}</p>
        <div class="teacher_row-name d-flex justify-content-between">
          <h2>${firstName}</h2>
          <h2>${lastName}</h2>
        </div>
        <img src="${avatar}" alt="">
        <div class="teacher_row-links d-flex flex-column">
          <p>${birthday}</p>
          <div>
            <input class="check" type="checkbox">
          </div>
          <div class="teacher_row-link d-flex align-items-center gap-2">
            <h5>Phone Number:</h5>
            <a href="tel: ${phoneNumber}">${phoneNumber}</a>
          </div>
          <div class="teacher_row-link d-flex align-items-center gap-2">
            <h5>Email:</h5>
            <a href="mailto: ${email}">${email}</a>
          </div>
        </div>
      </div>
  `;
}

async function getStudentCard() {
	let teachId = localStorage.getItem('teachId');
	console.log(teachId);
	let res = await fetch(ENDPOINT + `teacher/${teachId}/student`);
	let studentCard = await res.json();
	studentCard.forEach(
		element => (student_rows.innerHTML += getStudentCard(element))
	);
}

getStudentCard();
