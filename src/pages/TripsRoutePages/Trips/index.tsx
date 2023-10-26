import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { getTrips } from "../../../utils/firestore";
import { Trip } from "../../../types/trip";
import { TripListItem } from "../../../components/atom/TriplistItem";

const PageTrips = ({ navigation } : any) => {

  const [trips, setTrips] = React.useState<Trip[]>();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const trips = await getTrips();
            setTrips(trips as Trip[]);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };
    fetchData();
}, []);

  return (
    <ScrollView>
      {trips?.map((trip, index) => (
        <TripListItem key={index} trip={trip} onPress={()=> navigation.navigate('TripDetails', {trip: trip})}/>
      ))}
    </ScrollView>
  );
};

export default PageTrips;
