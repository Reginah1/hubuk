function validateForm() {
    event.preventDefault();

    let fnameRegex = /^[a-zA-Z\ -]+$/; 
    let fname = document.forms["myForm"]["fname"].value;
    let isValid = true;

    if (fname == "") {
        document.getElementById("fnameerror").innerHTML = "First Name must not be empty";
        isValid = false;
    } else if (!fnameRegex.test(fname)) {
        document.getElementById("fnameerror").innerHTML = "Please enter a valid name";
        isValid = false;
    }

    let lname = document.forms["myForm"]["lname"].value;
    let lnameRegex = /^[a-zA-Z\ -]+$/; 
    if (lname == "") {
        document.getElementById("lnameerror").innerHTML = "Last Name must not be empty";
        isValid = false;
    } else if (!lnameRegex.test(lname)) {
        document.getElementById("lnameerror").innerHTML = "Please enter a valid name!";
        isValid = false;
    }

    let email = document.forms["myForm"]["email"].value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
        document.getElementById("emailerror").innerHTML = "Email must not be empty";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailerror").innerHTML = "Please enter a valid Email Address!";
        isValid = false;
    }
    var phone = document.getElementById('phone').value;
    if (phone.length !== 11) {
        document.getElementById("phoneerror").innerHTML="Please enter a valid Phone Number" ;
        return false;
    }
    if (isValid) {
        window.location.href = "successpage.html?fname=" + encodeURIComponent(fname);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const resume_input = document.getElementById("resume");
    const cv_input = document.getElementById("coverletter");

    if (resume_input) {
        resume_input.addEventListener('change', () => {
            const resume_file = resume_input.files[0];
            if (resume_file) {
                const resume_name = resume_file.name;
                const resume_size = (resume_file.size / 1024).toFixed(2); // Convert size to KB
                document.getElementById("textpr").innerHTML = resume_name;
                document.getElementById("re").innerHTML = "Resume: ";
                document.getElementById("sizer").innerHTML = `${resume_size} KB`;
                document.getElementById("forResume").style.display ='flex';
            }
        });
    }

    if (cv_input) {
        cv_input.addEventListener('change', () => {
            const cv_file = cv_input.files[0];
            if (cv_file) {
                const cv_name = cv_file.name;
                const cv_size = (cv_file.size / 1024).toFixed(2); // Convert size to KB
                document.getElementById("textpcv").innerHTML = cv_name ;
                document.getElementById("cv").innerHTML = "Cover Letter: ";
                document.getElementById("sizecv").innerHTML =`${cv_size} KB`;
                document.getElementById("forCoverletter").style.display ='flex';
            }
        });
    }
   
    // Handle resume file deletion
    document.getElementById("faone")?.addEventListener('click', function() {
        // Clear the resume input
        resume_input.value = "";
        
        // Clear the displayed resume name and size
        document.getElementById("forResume").style.display ='none';
      //  document.getElementById("textpr").innerHTML = "Resume/Cv";
        //document.getElementById("sizer").innerHTML = "";
        
        // Hide the delete button
        //document.getElementById("faone").style.display = 'none';
    });

    // Handle cover letter file deletion
    document.getElementById("fatwo")?.addEventListener('click', function() {
        // Clear the cover letter input
        cv_input.value = "";
        
        // Clear the displayed cover letter name and size
        document.getElementById("forCoverletter").style.display ='none';
        document.getElementById("textpcv").innerHTML = "Cover Letter";
        document.getElementById("sizecv").innerHTML = "";
        
        // Hide the delete button
       // document.getElementById("fatwo").style.display = 'none';
    });

});
