function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  function calculateExperience(joiningDateString) {
    const today = new Date();
    const joiningDate = new Date(joiningDateString);
    let experience = today.getFullYear() - joiningDate.getFullYear();
    const monthDiff = today.getMonth() - joiningDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joiningDate.getDate())) {
      experience--;
    }

    return experience;
  }

  function addEmployee() {
    const name = document.getElementById('name').value;
    const employeeID = document.getElementById('employeeID').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const designation = document.getElementById('designation').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const joiningDate = document.getElementById('joiningDate').value;
    const salary = document.getElementById('salary').value;

    const age = calculateAge(dob);
    const experience = calculateExperience(joiningDate);

    const tableBody = document.getElementById('employeeTableBody');
    const newRow = tableBody.insertRow(-1);
    const cells = [
      name, employeeID, dob, gender, designation,
      phone, address, joiningDate, age, experience + " Years", salary
    ];

    for (const cellData of cells) {
      const newCell = newRow.insertCell();
      newCell.innerHTML = cellData;
    }

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.onclick = function() {
      editEmployee(newRow);
    };
    newRow.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
      deleteEmployee(newRow);
    };
    newRow.appendChild(deleteButton);

    sortTable();
  }

  function editEmployee(row) {
    row.classList.toggle('edit-mode');

    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 2; i++) {
      cells[i].contentEditable = !cells[i].isContentEditable;
    }
  }

  function deleteEmployee(row) {
    row.parentNode.removeChild(row);
  }

  function sortTable() {
    const table = document.getElementById('employeeTable');
    const rows = table.rows;
    let switching = true;

    while (switching) {
      switching = false;
      for (let i = 1; i < rows.length - 1; i++) {
        let shouldSwitch = false;

        const currentSalary = parseFloat(rows[i].getElementsByTagName('td')[10].innerText);
        const nextSalary = parseFloat(rows[i + 1].getElementsByTagName('td')[10].innerText);
        const currentExperience = parseFloat(rows[i].getElementsByTagName('td')[9].innerText);
        const nextExperience = parseFloat(rows[i + 1].getElementsByTagName('td')[9].innerText);

        if (currentSalary < nextSalary || (currentSalary === nextSalary && currentExperience < nextExperience)) {
          shouldSwitch = true;
          break;
        }

        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
  }