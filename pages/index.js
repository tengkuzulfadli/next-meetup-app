import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';


//We canadd Head to all over pages

function HomePage(props) {
    return (
        <Fragment>
            
            <Head>
                <title>Nextjs Meet up app with Mongodb</title>
                <meta name='' description='' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
        
    );
}

//export async function getServerSideProps(context) {
    //Fetch data from API
    //Any code write here, always run on the server, never in the client
//    const req = context.req;
//    const res = context.res;

//    return {
//        props: {
//            meetups: DUMMY_MEETUPS
//        }
//    };
//}

export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://tengku_zulfadli:DcR0fUEuUh4d1hcY@cluster0.rnj86.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetups => ({
                title: meetups.title,
                address: meetups.address,
                description: meetups.description,
                id: meetups._id.toString(),
            }))
        },
        revalidate: 10
    };
}

export default HomePage;