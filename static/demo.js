const firstInput=document.getElementById("name");
const secondInput=document.getElementById("email");
const thirdInput=document.getElementById("submission");
const Name=firstInput.value;
const Email=secondInput.value;
const Submission=thirdInput.value;



var button = document.getElementById("myButton");
button.addEventListener("click", myFunction);

function setDetails(){
// Replace with your function name
const apiUrl = `https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/submissions`; // Replace with your app ID and function name
const data = {
// Replace with your body parameter
"name": Name,
"email": Email,
"submission":[Submission]
};

const options = {
method: 'POST',
body: JSON.stringify(data),
headers: {
'Content-Type': 'application/json'
}
};

fetch(apiUrl, options)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
}

function getSubmission()
{
    console.log(Name);
    console.log(Email);

let c=0;
fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/getSubmission')
.then(response => response.json())
.then(data => {
for (let i = 0; i < data.length; i++) {
 const item = data[i];

 if (item.name === 'rahul' && item.email === 'rahul@gmail.com') { // replace 'matched value' with the value you want to match
     c=1;
     console.log(item.submission);
     console.log("Array values:");
   for (let j = 0; j < item.submission.length; j++) {
     console.log(item.submission[j]); // replace 'arrayKey' with the name of the array key
   }
 }
 
}

}

)
.catch(error => console.error(error));

if(c===0)
{
   setDetails();
}

}
