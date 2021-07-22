import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from 'mongodb';

function MeetupDetails(props) {
    return (
        <MeetupDetail 
            title={props.meetupData.title} 
            address={props.meetupData.address}
            description={props.meetupData.description} 
        />
    );
}

export async function getStaticPaths() {

    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://tengku_zulfadli:DcR0fUEuUh4d1hcY@cluster0.rnj86.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return{
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() },
        })),
        
    };
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;

    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://tengku_zulfadli:DcR0fUEuUh4d1hcY@cluster0.rnj86.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    //Access to a single meet up
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId),});

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        }
    }
}

export default MeetupDetails;