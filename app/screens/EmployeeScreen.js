import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    StatusBar,
    ScrollView,
    RefreshControl
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { FAB, IconButton, Paragraph, Card, Searchbar } from 'react-native-paper';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

const EmployeeScreen = ({navigation}) => {
  
    const { colors } = useTheme();

    const [data, setData] = React.useState({
      employees: {},
      temp: {},
      loading: true,
    });

    const unsubscribe = navigation.addListener('focus', () => {
      getEmployeeList();
    });

    React.useEffect(() => {
      getEmployeeList();
      return () => {
        unsubscribe;
      }
    }, []);

    const getEmployeeList = async () => {
      try {
        let response = await fetch(
          'http://10.0.2.2:80/reactbackend/listemployee.php'
        );
        let json = await response.json();
        setData({
          employees: json,
          temp: json,
          loading: false,
        })
        console.log(data.employees);
      } catch (error) {
        alert(error);
      }
    };

    const NoEmployee = () => {
      if(data.temp.length === 0){
        return <Text style={styles.noemployees}>No employees to show.</Text>
      }else{
        return null
      }
    };

    const searchEmployee = (text) => {
      setData({
        ...data,
        temp: data.employees.filter(i =>
          (i.lastname+i.firstname).toLowerCase().includes(text.toLowerCase()))
      })
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getEmployeeList().then(() => setRefreshing(false));
    }, []);

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
          <Text style={[styles.title, {color: "gray"}]} onPress={ ()=> navigation.navigate('CompanyScreen') }>Companies <Text style={styles.title}>Employees</Text></Text>
          <IconButton style={styles.logout} icon="logout" onPress={() => {  alert("logout function here")  }} />
          <Searchbar
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={text=>{searchEmployee(text)}}
           />
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeIn"
        >           
            { data.loading === true ? (
              <Placeholder Animation={Fade} style={[styles.card, {marginTop: 20}]} >
                <PlaceholderLine width={30} />
                <PlaceholderLine />
                <PlaceholderLine width={80} />
                <PlaceholderLine width={0} />
                <PlaceholderLine width={40} />
                <PlaceholderLine />
                <PlaceholderLine width={60} />
                <PlaceholderLine width={0} />
                <PlaceholderLine width={30} />
                <PlaceholderLine />
                <PlaceholderLine width={20} />
                <PlaceholderLine width={0} />
                <PlaceholderLine width={50} />
                <PlaceholderLine />
                <PlaceholderLine width={50} />
              </Placeholder>
            ) : (
              <ScrollView 
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
              >
                <NoEmployee />
                { data.temp.map((employee, id) => (
                  <Card style={styles.card} key={id}>
                      <Card.Title 
                          title={employee.firstname + " " + employee.lastname}
                          titleStyle={styles.employeeHeader}
                          right={(props) => <IconButton {...props} icon="pencil" onPress={() => { 
                              navigation.navigate('EditEmployeeScreen', {
                                employeeToUpdate: employee,
                              }) 
                            }} />} />
                      <Card.Content>
                        <Paragraph style={styles.employeeAddress}>{employee.company}</Paragraph>
                        <Paragraph style={styles.employeeWebsite}>{employee.email}</Paragraph>
                      </Card.Content>
                  </Card>
                ))}
              </ScrollView>         
            )}
            
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('NewEmployeeScreen')}
            />
        </Animatable.View>
      </View>
    );
};

export default EmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 30
  },
  title: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      paddingVertical: 10,
      marginLeft: 60,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#fc0ca4',
  },
  searchInput: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius:20,
    marginLeft:30,
    marginRight:30,
    marginBottom:20,
  },
  employeeHeader: {
    color: 'black',
    fontWeight: 'bold',
  },
  employeeAddress: {
    marginTop:-20,
    color: '#808080',
    fontWeight: 'bold',
  },
  employeeWebsite: {
      color: 'black',
  },
  card: {
    marginBottom:10,
  },
  noemployees: {
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold'
  },
  logout: {
    backgroundColor: 'white',
    marginTop: -45,
    marginLeft: 10,
    marginBottom: 15
  }
});