var hashMap = { "Python": "Python (3.8.1)", "Java": "Java (OpenJDK 13.0.1)", "C": "C (GCC 9.2.0)" };
  var globalId = null;
  var dropdown = document.getElementById("dropdown");
  var select1 = document.getElementById("dropdown1");
  dynamicdropdown1();

  
  
  
  async function getValueFromServer(selectedValue) {

let xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.open("GET", 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/language', false);
//xmlHttpReq.open("GET", 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/getSubmissions', false);

xmlHttpReq.send(null);

let obj = JSON.parse(xmlHttpReq.responseText);
const value1 = obj[0][selectedValue];
console.log(value1);
const myTextarea = document.getElementById("code_input");
myTextarea.value = value1;
//result.innerHTML = value1;
}
  dropdown.addEventListener("change", function() {
    const selectedValue = dropdown.value;
  const options = dropdown.options;
  let selectedOptionText = '';

  for (let i = 0; i < options.length; i++) {
    if (options[i].value === selectedValue) {
      selectedOptionText = options[i].textContent;
      break;
    }
  }
  const Selected_value= `${selectedValue}`
  const Selected_option= `${selectedOptionText}`  
  console.log(`Selected value: ${selectedValue}`);
  console.log(`Selected option: ${selectedOptionText}`);
    
  fetch('/select_lang', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Selected_value: Selected_value,
    Selected_option: Selected_option
  })
})
.then(response => response.json())
.then(data => {
  
  // handle the response data here
  data.forEach(item => {
     // console.log(item.name.toString());
     if(item.name.toString() == hashMap[Selected_option].toString())
      {
      globalId=item.id;
      getValueFromServer(item.id.toString());
     
   } 
    
  })
  console.log(data);
  console.log(selectedValue);
});
  });

 
//run the textarea code
var submitBtn = document.getElementById('Runbtn');
    submitBtn.addEventListener('click', function() {
        var textareaValue = document.querySelector('textarea[name="code_input"]').value;
        var stdin = document.querySelector('textarea[name="input_area"]').value;
        
       
      fetch('/run', {
            method: 'POST',
            body: JSON.stringify({
               textareaValue: textareaValue,
               Selected_value: globalId,
               stdin: stdin
              }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.text())
  .then(data => {
    console.log(data);
    const myTextarea = document.getElementById("result")
    myTextarea.innerHTML = data;
    console.log(data); // prints the returned JSON object
  })
  .catch(error => {
    console.error(error);
  });
    });


//submit the code
var submitBtn = document.getElementById('Executebtn');
    submitBtn.addEventListener('click', function() {
        var textareaValue = document.querySelector('textarea[name="code_input"]').value;
        var stdin = document.querySelector('textarea[name="input_area"]').value;
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
  
        const data1 = { name: name };
        console.log(data1);
       
      fetch('/submit', {
            method: 'POST',
            body: JSON.stringify({
               textareaValue: textareaValue,
               Selected_value: globalId,
               stdin: stdin,
               name:name
              
              }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.text())
  .then(data => {
    console.log(data);
    const myTextarea = document.getElementById("result")
    myTextarea.innerHTML = data;
    dynamicdropdown1()
    console.log(data); // prints the returned JSON object
  })
  .catch(error => {
    console.error(error);
  });
    });

    function dynamicdropdown() {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');

      const data1 = { name: name };
      console.log(data1);
 
 fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/language')
 .then(response => response.json())
 .then(data => {
   data.forEach(item => {
     for (let key of Object.keys(item)) {
       console.log(key);
       if(key==="submissions")
       {
        
       let str = `${item[key]}`;
        
         let k = str.split(",");
         console.log(k);
         subarray=[];
         for(let i=0;i<k.length;i++)
         {
           subarray.push(k[i]);
         }
         select1.innerHTML="";
         let newOption = document.createElement("option");
         newOption.value = "Result";
         newOption.textContent = "Result";
         select1.appendChild(newOption);
         for(let i=0;i<subarray.length;i++)
         {
           var option = document.createElement("option");
         option.text =  "submission"+i+"  "+subarray[i];
         option.value = "submission"+i+"  "+subarray[i];
         select1.add(option);
         }
         
       }
     
      
     }
     
    
   });

   
  
 })
 .catch(error => {
   console.error(error);
 });

}

function dynamicdropdown1() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  const data1 = { name: name };
  console.log(data1);

fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-awqqz/endpoint/getSubmissions')
.then(response => response.json())
.then(data => {
  subarray=[];
  for(let i=0;i<data.length;i++)
  {
    
    let demourl = data[i]['url'];
    let k = demourl.split("/");
   
    
    if(k[k.length-1]===name)
    {
     let demosub=data[i]['submissions']
     demosub.forEach(element => {
      console.log(element+"---------");
      subarray.push(element);
      
     
    });

    }
  }
    console.log(subarray+"--------");
    select1.innerHTML="";
    let newOption = document.createElement("option");
    newOption.value = "Result";
    newOption.textContent = "Result";
    select1.appendChild(newOption);
    for(let j=0;j<subarray.length;j++)
    {
      console.log("hello------------------------------------------")

      var option1 = document.createElement("option");
     
    option1.text =  "submission"+j+"  "+subarray[j];
    option1.value = "submission"+j+"  "+subarray[j];
    console.log(option1.value+"hello rahul")
    select1.add(option1);
    }
    
  
   
})
.catch(error => {
console.error(error);
});

}

