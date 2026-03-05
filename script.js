let username="";

const quizData=[

{question:"Do you eat fruits daily?",a:"Yes",b:"Sometimes",c:"No"},

{question:"How many glasses of water do you drink daily?",a:"8 or more",b:"4 to 7",c:"Less than 4"},

{question:"How often do you eat junk food?",a:"Rarely",b:"Sometimes",c:"Often"},

{question:"Do you eat vegetables every day?",a:"Yes",b:"Sometimes",c:"No"},

{question:"Do you skip breakfast?",a:"Never",b:"Sometimes",c:"Often"},

{question:"Do you drink sugary drinks daily?",a:"Rarely",b:"Sometimes",c:"Often"},

{question:"Do you eat whole grains like oats or brown rice?",a:"Regularly",b:"Sometimes",c:"Rarely"},

{question:"How often do you eat fast food?",a:"Rarely",b:"Sometimes",c:"Often"},

{question:"Do you include protein in meals?",a:"Always",b:"Sometimes",c:"Rarely"},

{question:"Do you snack on healthy foods?",a:"Yes",b:"Sometimes",c:"No"}

];

let current=0;
let score=0;

function startQuiz(){

username=document.getElementById("username").value;

if(username===""){
alert("Please enter your name");
return;
}

document.getElementById("startScreen").style.display="none";
document.getElementById("quizBox").style.display="block";

loadQuestion();

}

function loadQuestion(){

let q=quizData[current];

document.getElementById("question").innerText=q.question;
document.getElementById("opt1").innerText=q.a;
document.getElementById("opt2").innerText=q.b;
document.getElementById("opt3").innerText=q.c;

let progress=(current/quizData.length)*100;
document.getElementById("progressBar").style.width=progress+"%";

}

function nextQuestion(){

let answers=document.getElementsByName("answer");

answers.forEach(ans=>{
if(ans.checked){
score+=parseInt(ans.value);
}
ans.checked=false;
});

current++;

if(current<quizData.length){
loadQuestion();
}
else{
showResult();
}

}

function showResult(){

let percentage=(score/(quizData.length*2))*100;

let result="";
let tip="";

if(percentage>=80){
result="Healthy Diet 🥗";
tip="Great job! Keep maintaining your healthy lifestyle.";
}
else if(percentage>=50){
result="Average Diet ⚠";
tip="Try adding more fruits and vegetables.";
}
else{
result="Unhealthy Diet ❌";
tip="Reduce junk food and drink more water.";
}

document.getElementById("quizBox").style.display="none";

document.getElementById("resultBox").innerHTML=
"<h2>"+username+"'s Result</h2>"+
"<h3>Score: "+score+"</h3>"+
"<h3>Percentage: "+percentage.toFixed(1)+"%</h3>"+
"<h3>"+result+"</h3>"+
"<p>"+tip+"</p>"+
"<button onclick='downloadCertificate()'>Download Certificate</button>";

}

function downloadCertificate(){

let text=
"Healthy Diet Quiz Certificate\n\n"+
"Name: "+username+"\n"+
"Score: "+score+"\n"+
"Congratulations for completing the quiz!";

let blob=new Blob([text],{type:"text/plain"});
let link=document.createElement("a");

link.href=URL.createObjectURL(blob);
link.download="certificate.txt";
link.click();

}