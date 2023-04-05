//let's prove your models here
import sessionsModel from "./models/sessions.model";

sessionsModel.createSession({
    duration: 'joa1',
    endDate: 'joa2',
    initDate: 'joa3',
    reached_goals: 5,
    reviewed_cards: 23,
    userId: '1'
})

//sessionsModel.getUserSessions('2').then((userSessions) => console.log(userSessions))

/*sessionsModel.deleteSession('297c6296-afac-4d9a-b744-3db809e0a28a').then(() => {
    console.log('session deleted')
})*/