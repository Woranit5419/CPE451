import {React, createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/friebase';

import Home from './src/Components/Home';
import Security from './src/Components/Security';
import Chat from './src/Components/Chat';
import Bills from './src/Components/Bills';
import Bells from './src/Components/Bells';
import Contract from './src/Components/Contract';
import Service from './src/Components/Service';
import Pngtree from './src/Components/Pngtree';
import ChatAll from './src/Components/ChatAll'
import Login from './screen/Login';
import Signup from './screen/SignUp';
import BillCal from './src/Components/Bill Payment/BillCal';
import BillHistory from './src/Components/Bill Payment/BillHistory';
import UploadSlip from './src/Components/Bill Payment/UploadSlip';
import Room from './src/Components/Contract/Room';
import Return from './src/Components/Contract/Return';
import Hire from './src/Components/Contract/Hire';
import EmergencyReportScreen from './src/Components/Security/EmergencyReportScreen';
import EmergencyReportScreen2 from './src/Components/Security/EmergencyReportScreen2';
import EmergencyReportScreen3 from './src/Components/Security/EmergencyReportScreen3';
import EmergencyReportScreen4 from './src/Components/Security/EmergencyReportScreen4';
import EmergencyReportScreen5 from './src/Components/Security/EmergencyReportScreen5';
import Repair from './src/Components/Ser1/Ser1';
import Clean from './src/Components/Ser1/Ser2';
import Profile from './src/Components/Profile/Profile';

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="security" component={Security} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="bills" component={Bills} />
      <Stack.Screen name="bells" component={Bells} />
      <Stack.Screen name="contract" component={Contract} />
      <Stack.Screen name="service" component={Service} />
      <Stack.Screen name="pngtree" component={Pngtree} />
      <Stack.Screen name="chatAll" component={ChatAll} />
      <Stack.Screen name="BillCal" component={BillCal} />
      <Stack.Screen name="BillHistory" component={BillHistory} />
      <Stack.Screen name="UploadSlip" component={UploadSlip} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="Return" component={Return} />
      <Stack.Screen name="Hire" component={Hire} />
      <Stack.Screen name="EmergencyReportScreen" component={EmergencyReportScreen} />
      <Stack.Screen name="EmergencyReportScreen2" component={EmergencyReportScreen2} />
      <Stack.Screen name="EmergencyReportScreen3" component={EmergencyReportScreen3} />
      <Stack.Screen name="EmergencyReportScreen4" component={EmergencyReportScreen4} />
      <Stack.Screen name="EmergencyReportScreen5" component={EmergencyReportScreen5} />
      <Stack.Screen name="Repair" component={Repair} />
      <Stack.Screen name="Clean" component={Clean} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>

  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigation() {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      },
    );
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ?   <HomeStack /> : <AuthStack/>}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
  <RootNavigation />
  </AuthenticatedUserProvider>
)}
