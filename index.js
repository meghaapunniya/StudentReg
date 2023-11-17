function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("Enter a valid Phone number");
        return false;
        }
}
  
function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
        return true;
    }
    else{
        alert("Enter a valid email Address")
        return false;
    }
    
  }
  
  function submitForm(){

   

    const firstname = document.getElementById("firstname").value.toUpperCase();
    const lastname = document.getElementById("lastname").value.toUpperCase();
    const rollNo = document.getElementById("rollNo").value.toUpperCase();
    const email = document.getElementById("email").value.toUpperCase();
    const phone = document.getElementById("phone").value.toUpperCase();
    const skills = document.getElementById("skills").value.toUpperCase();
    const qualifications = document.getElementById("qualifications").value.toUpperCase();
    const imageFile = document.getElementById("profile").files[0];

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("roll", rollNo);
    formData.append("email", email);
    formData.append("phone",phone);
    formData.append("skills", skills);
    formData.append("qualifications", qualifications);
    formData.append("pic", imageFile);

    console.log("formdata",formData)

    if(phonenumber(phone) && isValidEmail(email)){
        fetch("http://localhost:3000/save-student", {
            method: "POST",
            body: formData,
        })
        .then((res)=>{
            console.log("retrieved",res.data)
            
        })   
        .catch(error => {
            console.error("Error:", error);
        });
    
    
    }

   
  }

    
 
    // const destinationURL = "report.html" +
    // "?studentId=" + encodeURIComponent(res._id)   
    // window.location.href = destinationURL;     