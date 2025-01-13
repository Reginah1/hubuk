document.addEventListener("DOMContentLoaded", function() {
        const submitBtn = document.getElementById("submit");
        submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent
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
        const address = document.getElementById("paddress").value;
        if(address == ""){
            document.getElementById("addresserror").innerHTML="Please enter your address";
            isValid = false;
        }
        var phone = document.getElementById('phone').value;
        if (phone.length !== 11) {
            document.getElementById("phoneerror").innerHTML="Please enter a valid Phone Number" ;
            isValid = false;
        }
        if (!isValid) {
            document.getElementById("submit").innerHTML = "Submit your application";
            document.getElementById("submit").disabled = false;
           
        }else{
            document.getElementById("submit").innerHTML = "Loading.....";
            document.getElementById("submit").disabled = true;
            localStorage.setItem("fname", fname);
        }
        submitFormAsJSON();
    
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const resume_input = document.getElementById("resume");
    const cv_input = document.getElementById("coverletter");
    const allowedExtentions = ['pdf','docx', 'doc'];
    if (resume_input) {
        resume_input.addEventListener('change', () => {
            const resume_file = resume_input.files[0];
            if (resume_file) {
                const resume_name = resume_file.name;
                const resume_size = (resume_file.size / 1024).toFixed(2); // Convert size to KB
                const fileExtentionr = resume_name.split('.').pop().toLowerCase();
            if(allowedExtentions.includes(fileExtentionr)){
                if(resume_size <= 5120){
                    document.getElementById("textpr").innerHTML = resume_name;
                    document.getElementById("re").innerHTML = "Resume: ";
                    document.getElementById("sizer").innerHTML = `${resume_size} KB`;
                    document.getElementById("forResume").style.display ='flex';
                }
                else{
                    document.getElementById("warningr").innerHTML = "File too large!";
                    resume_input.value= "";
                }
            }
            else{
                document.getElementById("warningr").innerHTML = "Invalid File Extention! Can only accept pdf. docx or doc files";
                resume_input.value= "";
            }
            }
          
        });
    }

    if (cv_input) {
        cv_input.addEventListener('change', () => {
            const cv_file = cv_input.files[0];
            if (cv_file) {
                const cv_name = cv_file.name;
                const cv_size = (cv_file.size / 1024).toFixed(2); // Convert size to KB
                const fileExtentioncv = cv_name.split('.').pop().toLowerCase();
                if(allowedExtentions.includes(fileExtentioncv)){
                    if(cv_size <= 5120){
                        document.getElementById("textpcv").innerHTML = cv_name ;
                        document.getElementById("cv").innerHTML = "Cover Letter: ";
                        document.getElementById("sizecv").innerHTML =`${cv_size} KB`;
                        document.getElementById("forCoverletter").style.display ='flex';
                    }
                    else{
                        document.getElementById("warningcv").innerHTML = "File to Large!";
                        resume_input.value= "";
                    }
                }
                else{
                    document.getElementById("warningcv").innerHTML = "Invalid File Extention! Can only accept pdf. docx or doc files";
                    resume_input.value= "";
                }
               
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
async function submitFormAsJSON() {
    const fname = document.getElementById("fname").value;
    let lname = document.forms["myForm"]["lname"].value;
    let email = document.forms["myForm"]["email"].value;
    let address = document.forms["myForm"]["paddress"].value;
    let phone =  document.getElementById("phone").value;
    let Linkedin =  document.getElementById("link").value || "";
    let portfolio = document.getElementById("portfolio").value || "";
    const formData = new FormData();
    formData.append("JobId", "1");
    formData.append("FirstName", fname);
    formData.append("LasttName", lname);
    formData.append("Email", email);
    formData.append("PermanentAddress", address);
    formData.append("PhoneNumber", phone);
    formData.append("LinkedinProfile", Linkedin);
    formData.append("PortfolioWebsite", portfolio);

    // Add files
    const resume = document.getElementById("resume").files[0];
    const coverLetter = document.getElementById("coverletter").files[0];
    if (resume) formData.append("CV", resume);
    if (coverLetter) formData.append("CoverLetter", coverLetter);

    try {
        const response = await fetch("https://api.hubuk.ng/api/JobApplicantion/Apply", {
            method: "POST",
            body: formData,
        });
        if(response.status === 200){
           window.location.href = "successpage.html";
           document.getElementById("submit").innerHTML = "Submited";
           document.getElementById("submit").disabled = false;
        }
        else if(response.status === 500){
            throw new Error(`HTTP error! Status: ${response.status}`);
            window.location.href = "errorpage.html";
        }
        else if(response.status === 400){
            throw new Error("Bad Request: Please check your input");
        }
        else{
            throw new Error(`HTTP error! Status: ${response.status} Unexpected error`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        document.getElementsByClassName("errormessage").innerHTML = '<span class="error">Failed to submit. Please try again.</span>';
        
    }
    finally{
        document.getElementById("submit").innerHTML = "Submit your application";
        document.getElementById("submit").disabled = false;
    }
}




