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

const CompanyScreen = ({navigation}) => {
  
    const { colors } = useTheme();

    const [data, setData] = React.useState({
      companies: {},
      temp: {},
      loading: true,
    });

    const unsubscribe = navigation.addListener('focus', () => {
      getCompanyList();
    });

    React.useEffect(() => {
      getCompanyList();
      return () => {
        unsubscribe;
      }
    }, []);

    const getCompanyList = async () => {
      try {
        let response = await fetch(
          'http://10.0.2.2:80/reactbackend/listcompany.php'
        );
        let json = await response.json();
        setData({
          companies: json,
          temp: json,
          loading: false,
        })
        console.log(data.companies);
      } catch (error) {
        alert(error);
      }
    };

    const NoCompany = () => {
      if(data.temp.length === 0){
        return <Text style={styles.nocompanies}>No companies to show.</Text>
      }else{
        return null
      }
    };

    const searchCompany = (text) => {
      setData({
        ...data,
        temp: data.companies.filter(i =>
          i.name.toLowerCase().includes(text.toLowerCase()))
      })
    };

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getCompanyList().then(() => setRefreshing(false));
    }, []);

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
          <Text style={styles.title}>Companies <Text style={[styles.title, {color: "gray"}]} onPress={ ()=> navigation.navigate('EmployeeScreen') }>Employees</Text></Text>
          <IconButton style={styles.logout} icon="logout" onPress={() => {  alert("logout function here")  }} />
          <Searchbar
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={text=>{searchCompany(text)}}
           />
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInLeftBig"
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
                <NoCompany />
                { data.temp.map((company, id) => (
                  <Card style={styles.card} key={id}>
                      <Card.Title 
                          title={company.name}
                          titleStyle={styles.companyHeader}
                          right={(props) => <IconButton {...props} icon="pencil" onPress={() => { 
                              navigation.navigate('EditCompanyScreen', {
                                companyToUpdate: company,
                              }) 
                            }} />} />
                      <Card.Content>
                        <Paragraph style={styles.companyAddress}>{company.address}</Paragraph>
                        <Paragraph style={styles.companyWebsite}>{company.website}</Paragraph>
                      </Card.Content>
                  </Card>
                ))}
              </ScrollView>         
            )}
            
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('NewCompanyScreen')}
            />
        </Animatable.View>
      </View>
    );
};

export default CompanyScreen;

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
  companyHeader: {
    color: 'black',
    fontWeight: 'bold',
  },
  companyAddress: {
    marginTop:-20,
    color: '#808080',
    fontWeight: 'bold',
  },
  companyWebsite: {
      color: 'black',
  },
  card: {
    marginBottom:10,
  },
  nocompanies: {
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