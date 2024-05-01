// Frontend JavaScript code

// Define getStatusIcon function
function getStatusIcon(status) {
    switch (status) {
        case 'done':
            return 'fa-circle-check';
        case 'not done':
            return 'fa-circle-xmark';
        default:
            return 'fa-circle';
    }
}

function toggleStatus(habitId, index, currentStatus) {
    // Determine the new status based on the current status
    console.log(`habitId: ${habitId}, index: ${index}, currectStatus: ${currentStatus}`);
    let newStatus;
    if (currentStatus === 'none') {
        newStatus = 'done';
    } else if (currentStatus === 'done') {
        newStatus = 'not done';
    } else {
        newStatus = 'none';
    }

    // Update icon
    const iconElement = document.querySelector(`#status-icon-${habitId}-${index}`);
    console.log("iconElements: ",iconElement);
    iconElement.classList.remove('fa-circle', 'fa-circle-check', 'fa-circle-xmark');
    iconElement.classList.add(getStatusIcon(newStatus));

    // Send AJAX request to update status in the backend
    fetch('/update-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            habitId: habitId,
            index: index,
            status: newStatus
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        return response.json();
    })
    .then(data => {
      //  Handle success response from the server
        console.log("update respondse data,:", data);
        // // location.reload();
        // window.location.href = '/all-habits';
        // window.location.href = '/all-habits?upmsg=';
        let statusMessage;
        if (newStatus === 'done') {
            statusMessage = 'Habit marked as done successfully!';
        } else if (newStatus === 'not done') {
            statusMessage = 'Habit marked as not done successfully!';
        } else {
            statusMessage = 'Habit status updated successfully!';
        }
        
        // Redirect to the all-habit page with the status message
        window.location.href = `/all-habits?upmsg=${encodeURIComponent(statusMessage)}`;


        return;
        
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


const errorPopup = document.getElementById('errorPopup');
if (errorPopup) {
  
    errorPopup.classList.remove('hidden');
    
    setTimeout(() => {
        errorPopup.classList.add('hidden');
    }, 4000); 
}


const sucessPopup = document.getElementById("successPopup");
//console.log("sucessPopup: ", sucessPopup);
if(sucessPopup){
    sucessPopup.classList.remove('hidden');

    setTimeout(()=>{
        sucessPopup.classList.add('hidden');
    },4000)
}

// ........update habits from control
async function toggleUpdateHabitForm(habitId) {
    const formContainer = document.querySelector('.updateHabitFormContainer');
    const titleInput = document.getElementById('updateTitleInput');
    const descInput = document.getElementById('updateDescInput');
    const habitIdInput = document.getElementById('habitIdInput');
    const addForm= document.querySelector(".add-habitsForm");

    // Retrieve habit details based on habitId and populate the form fields
   
    const habit =await getHabitDetailsById(habitId); 
    if (habit) {
        titleInput.value = habit.habit.title;
        descInput.value = habit.habit.habitDesc;
        habitIdInput.value = habitId;
        console.log("update habits title value: ", habit.habit.title);
    }

    if(formContainer.classList.contains("add-habits-formContainer-hide")){
        formContainer.classList.remove("add-habits-formContainer-hide");
        formContainer.classList.add("add-habits-formContainer-show");
        addForm.style.display="flex";
    }else{
        formContainer.classList.add("add-habits-formContainer-hide");
        formContainer.classList.remove("add-habits-formContainer-show");
        addForm.style.display="none";
    }

    console.log("updated habits Id: ", habitId);


}

// Example function to fetch habit details by habit ID using AJAX
async function getHabitDetailsById(habitId) {
    try {
        const response = await fetch(`/getHabitById/${habitId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch habit details');
        }

        const habitDetails = await response.json();
        console.log("habits details fetch for update: ", habitDetails);
        return habitDetails;
    } catch (error) {
        console.error('Error fetching habit details:', error.message);
        return null;
    }
}

function HideUpdateHabitForm(){
    const formContainer = document.querySelector('.updateHabitFormContainer');
    const addForm= document.querySelector(".add-habitsForm");

    if(formContainer.classList.contains("add-habits-formContainer-hide")){
        formContainer.classList.remove("add-habits-formContainer-hide");
        formContainer.classList.add("add-habits-formContainer-show");
        addForm.style.display="flex";
    }else{
        formContainer.classList.add("add-habits-formContainer-hide");
        formContainer.classList.remove("add-habits-formContainer-show");
        addForm.style.display="none";
    }
}


