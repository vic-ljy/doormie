/*
———————————————————— write new sheduled status to database ————————————————————
END GOALS: add a new node under user's schedule node

NEED: 
- userID
- start time (YYMMDDHHMM)
- end time (YYMMDDHHMM OR 0)
- status ('away' OR 'quiet' OR 'chill')
- desc ('description text string')
*/
//should already be added (don't need to copy paste)
import { firebase } from './src/firebase/config';
const database = firebase.database();
let userGroup = 'NO_GROUP';

//COPY PASTE BELOW
//startTime YYMMDDHHMM 
function addScheduledStatus(startTime, endTime, status, desc) {
  let duration;
  let statusName = 0;

  if (endTime==0) { //endTime = 0 when status lasts indefinitely
    duration = 0;
  } else {
    duration = 60000*(toDate(endTime)-toDate(startTime));
  }

  if (status == 1) {
    statusName = "Away from home";
  } else if (status == 2) {
    statusName = "Quiet Please";
  } else if (status == 3) {
    statusName = "Chilling";
  } else {
    statusName = "Error";
  }

  database.ref(userGroup+'/'+user.uid+'/schedule').update(startTime, {
    duration, //duration: duration
    status: statusName,
    desc: desc
  })
}

function toDate(time) {
  //time format: YYMMDDHHMM
  //new format: '2011-04-11T10:20:30Z'
  time = time.toString();
  return new Date(`20${time.substr(0,2)}`,time.substr(2,2),time.substr(4,2),time.substr(6,2),time.substr(8,2))
}


