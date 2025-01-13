const jobId = 1;
const fname = document.getElementById('fname').value;
const lname = document.getElementById('lname').value;
const email = document.getElementById('email').value;
const address = document.getElementById('address').value;
const phone = document.getElementById('phone').value;
document.addEventListener("DOMContentLoaded", () => {
    // Allowed file extensions and size limit
    const allowedExtensions = ["pdf", "docx", "doc"];
    const maxFileSizeKB = 1024; // 1 MB

    const resumeInput = document.getElementById("resume");
    const cvInput = document.getElementById("coverletter");

    // Helper function to validate file uploads
    function validateFile(input, errorElement, displayElement, labelElement, sizeElement, type) {
        const file = input.files[0];
        if (file) {
            const fileName = file.name;
            const fileSize = (file.size / 1024).toFixed(2);
            const fileExtension = fileName.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                errorElement.textContent = `Invalid file type. Only ${allowedExtensions.join(", ")} are allowed.`;
                input.value = "";
                return false;
            }

            if (fileSize > maxFileSizeKB) {
                errorElement.textContent = `File too large! Maximum size is ${maxFileSizeKB} KB.`;
                input.value = "";
                return false;
            }

            labelElement.textContent = `${type}:`;
            displayElement.textContent = fileName;
            sizeElement.textContent = `${fileSize} KB`;
            errorElement.textContent = ""; // Clear errors
            return true;
        }

        return false;
    }

    // Add event listeners for file inputs
    if (resumeInput) {
        resumeInput.addEventListener("change", () => {
            validateFile(
                resumeInput,
                document.getElementById("warningr"),
                document.getElementById("textpr"),
                document.getElementById("re"),
                document.getElementById("sizer"),
                "Resume"
            );
            document.getElementById("forResume").style.display = "flex";
        });
    }

    if (cvInput) {
        cvInput.addEventListener("change", () => {
            validateFile(
                cvInput,
                document.getElementById("warningcv"),
                document.getElementById("textpcv"),
                document.getElementById("cv"),
                document.getElementById("sizecv"),
                "Cover Letter"
            );
            document.getElementById("forCoverletter").style.display = "flex";
        });
    }

    // Handle file deletions
    document.getElementById("faone")?.addEventListener("click", () => {
        resumeInput.value = "";
        document.getElementById("forResume").style.display = "none";
    });

    document.getElementById("fatwo")?.addEventListener("click", () => {
        cvInput.value = "";
        document.getElementById("forCoverletter").style.display = "none";
    });
});

// Form validation function
function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    // Validation rules
    const fields = [
        { id: "fname", errorId: "fnameerror", regex: /^[a-zA-Z\ -]+$/, errorMessage: "Please enter a valid First Name." },
        { id: "lname", errorId: "lnameerror", regex: /^[a-zA-Z\ -]+$/, errorMessage: "Please enter a valid Last Name." },
        { id: "email", errorId: "emailerror", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: "Please enter a valid Email Address." },
        { id: "phone", errorId: "phoneerror", regex: /^\d{11}$/, errorMessage: "Please enter a valid Phone Number." },
        { id: "paddress", errorId: "addresserror", regex: /.+/, errorMessage: "Please enter your address." },
    ];

    // Validate all fields
    fields.forEach(({ id, errorId, regex, errorMessage }) => {
        const value = document.getElementById(id).value;
        const errorElement = document.getElementById(errorId);

        if (!regex.test(value)) {
            errorElement.textContent = errorMessage;
            isValid = false;
        } else {
            errorElement.textContent = ""; // Clear previous errors
        }
    });

    if (isValid) {
        submitFormAsJSON();
    }
}

// Form submission function
async function submitFormAsJSON() {
    const formData = new FormData();

    // Collect input values
    formData.append("JobId", "1");
    formData.append("FirstName", document.getElementById("fname").value);
    formData.append("LasttName", document.getElementById("lname").value);
    formData.append("Email", document.getElementById("email").value);
    formData.append("PermanentAddress", document.getElementById("paddress").value);
    formData.append("PhoneNumber", document.getElementById("phone").value);
    formData.append("LinkedinProfile", document.getElementById("link").value || "");
    formData.append("PortfolioWebsite", document.getElementById("portfolio").value || "");

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

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        window.location.href = "successpage.html?fname=" + encodeURIComponent(fname);
        console.log(data);
    } catch (error) {
        console.error("Error submitting form:", error);
        document.querySelector(".errormessage").innerHTML = '<span class="error">Failed to submit. Please try again.</span>';
    }
}

// Attach form validation to form submission
document.forms["myForm"].addEventListener("submit", validateForm);
