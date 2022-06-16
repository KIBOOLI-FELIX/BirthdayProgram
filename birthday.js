

//JQUERY CODE
$(document).ready(function(){
  $("#personame").tooltip({
    track:true,
    content: "Enter your name",
    show:{effect:"highlight",durattion:2000},
    //hide:{effect:"explode",duration:2000}
  });

  $("#yob").tooltip({
    track:true,
    content: "Enter your birth year",
    show:{effect:"highlight",durattion:2000},
    //hide:{effect:"explode",duration:2000}
  });

  $("#btn").click(function(){
    $("#result").dialog("open");
  })
  $("#result").dialog({
    title:"BIRTHDAY MESSAGE",
    autoOpen:false,
    modal:true
  })
})

//Vanilla JavaScript Code
//creating birthday object
function birthdayCountDown(){
  var birthday={
    nameOfperson:function(){
      var personName=document.getElementById("personame").value;
      return personName;
    },
    dateOfBirth:function(){
      var year=document.getElementById("yob").value
      var month=document.getElementById("mob").value;
      var day=document.getElementById("dob").value;
      const birth_date= new Date(year,month-1,day);
      return birth_date;
    },
    currentDate:function(){
      var dateToday2=new Date();
      var year=dateToday2.getFullYear();
      var month=dateToday2.getMonth();
      var day=dateToday2.getDate();
      const current_date=new Date(year,month,day);
      return current_date;
    },
    currentAge:function(){
      const ageInSeconds=this.currentDate()-this.dateOfBirth();
      const ageInYears=(ageInSeconds)/(365*24*60*60*1000);
      return ageInYears;
    },
    newBirthdate:function(){
      const currentYear=this.currentDate().getFullYear();
      const birthMonth=this.dateOfBirth().getMonth();
      const birthdate=this.dateOfBirth().getDate();
      const birthDay=new Date(currentYear,birthMonth,birthdate);
      return birthDay;
    },
    birthAgeToBe:function(){
      const ageInSeconds=this.newBirthdate()-this.dateOfBirth();
      const ageInYears=(ageInSeconds)/(365*24*60*60*1000);
      return ageInYears;
    },
    daysRemainingToBD:function(){
      var difference=this.birthAgeToBe()-this.currentAge();
      var days=(difference*365).toFixed(0);
      return days;
    },
    fromTodayToBD:function(){
      var timeToBD=new Date(this.currentDate().getTime()+
      (this.daysRemainingToBD()*24*60*60*1000));
      return timeToBD;
    },
    messageOut:function(){
      var dayNames,monthNames,year,date,day,month, nameofperson;
      dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday",
                "Friday","Saturday"];
      monthNames=["January","February","March","April","May","June","July","August",
                   "September","October","November","December"];
      year=this.fromTodayToBD().getFullYear();
      month=monthNames[this.fromTodayToBD().getMonth()];
      date=this.fromTodayToBD().getDate();
      day=dayNames[this.fromTodayToBD().getDay()];
      nameofperson=this.nameOfperson();
      const birthArray=[year,month,date,day,nameofperson];
      return birthArray;
    },
    logicTest:function(){
      var difference=this.daysRemainingToBD();
      if(difference<0){
        var Msg="Hi "+birthday.messageOut()[4]+", you celebrated your birthday "+Math.abs(difference)+
        " days ago."+" It was on: " +birthday.messageOut()[3]+", "+birthday.messageOut()[1]+
         " " +birthday.messageOut()[2]+","+birthday.messageOut()[0];

       } else if(difference==0){
         var Msg="Happy birthday to you,";
      
       } else{
        var Msg="Hi "+birthday.messageOut()[4]+", wait a little more while your birthday approaches."
        +"It will be in "+Math.abs(difference)+" days from now and it shall be celebrated on: " 
        +birthday.messageOut()[3]+", "+birthday.messageOut()[1]+
         " " +birthday.messageOut()[2]+","+birthday.messageOut()[0]+".We pray that God Keeps you safe"+
         " till you celebrate your " +birthday.birthAgeToBe().toFixed(0)+"th" +" birthday.";
       }
       return Msg;
    }
     
  };
  console.log(birthday.logicTest());
   //creating element for results
   var message=document.createElement("p")
   message.textContent=birthday.logicTest();
   message.setAttribute("id","msgOut");
   document.getElementById("result").appendChild(message);
}



