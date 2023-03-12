const teacher_rows = document.querySelector('.teacher-rows');
const marriedBtn = document.querySelector('.mm');
const unmarriedBtn = document.querySelector('.nm');
const check = document.querySelectorAll(`.check`);

function getTeacherCards({
	createdAt,
	firstName,
	lastName,
	avatar,
	phoneNumber,
	email,
	id,
}) {
	return `
	  <div class="teacher-row">
        <p>${createdAt}</p>
      <div class="teacher_row-name d-flex justify-content-between">
        <h2>${firstName}</h2>
        <h2>${lastName}</h2>
      </div>
        <img src="${avatar}" alt="">
      <div class="teacher_row-links d-flex flex-column">
        <div class="teacher_row-link d-flex align-items-center gap-2">
					<h5>Phone Number:</h5>
					<a href="tel: ${phoneNumber}">${phoneNumber}</a>
				</div>
        <div class="teacher_row-link d-flex align-items-center gap-2">
					<h5>Email:</h5>
        	<a href="mailto: ${email}">${email}</a>
				</div>
      </div>
  		<div>
				<input class="check" type="checkbox">
			</div>
			<a href='student.html' class='goStudent' onclick='teacherId(${id})'>Go student</a>
    </div>
	`;
}

async function getTeachCard() {
	let res = await fetch(ENDPOINT + 'teacher', { method: 'GET' });
	let teacherCard = await res.json();
	teacherCard.sort((a, b) => a.firstName.localeCompare(b.firstName));
	teacherCard.forEach(el => (teacher_rows.innerHTML += getTeacherCards(el)));
	unmarriedBtn.addEventListener('click', () => {
		teacher_rows.innerHTML = '';
		teacherCard.forEach(el => {
			if (el.isMarried == false) {
				teacher_rows.innerHTML += getTeacherCards(el);
			}
		});
	});
	marriedBtn.addEventListener('click', () => {
		teacher_rows.innerHTML = '';
		teacherCard.forEach(el => {
			if (el.isMarried == true) {
				teacher_rows.innerHTML += getTeacherCards(el);
			}
		});
	});
}

getTeachCard();

function teacherId(id) {
	localStorage.setItem('teachId', id);
}
