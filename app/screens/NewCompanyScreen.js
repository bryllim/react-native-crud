import React from 'react';
import { 
    Text, 
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Alert, 
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const NewCompanyScreen = ({navigation}) => {

  const [data, setData] = React.useState({
    name: '',
    address: '',
    website: '',
    disabled: false,
  });

  const newCompany = () => {
    if(data.name.length == 0 || data.address.length == 0 || data.website.length == 0){

      Alert.alert('Wrong input!', 'Please fill in all fields.', [
        {text: 'Okay'}
      ]);

    }else{

      setData({
        ...data,
        disabled: true
      });

      const companyData = {
        name: data.name,
        address: data.address,
        website: data.website,
      }

      const newCompanyAPI = "http://10.0.2.2:80/reactbackend/newcompany.php";

      const headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
      };

      async function createNewCompany() {
        try{
          const response = await fetch(newCompanyAPI, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(companyData),
          });
          const result = await response.json();
          Alert.alert('Company created', result[0].Message, [
            {text: 'Okay', onPress: () => navigation.navigate('CompanyScreen')}
          ]);
        } catch (error) {
          alert("Error: " + error);
          setData({
            ...data,
            disabled: false
          });
        }
      }
      createNewCompany();

    }
  }

  const handleNameChange = (val) => {
    setData({
      ...data,
      name: val,
    })
  }

  const handleAddressChange = (val) => {
    setData({
      ...data,
      address: val,
    })
  }

  const handleWebsiteChange = (val) => {
    setData({
      ...data,
      website: val,
    })
  }

  return (
    <Animatable.View style={styles.container} animation="fadeInLeftBig">
        <StatusBar backgroundColor='black' barStyle="light-content"/>
        <Text style={styles.title}>New Company</Text>
        <Text style={styles.label}>Company name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleNameChange(val)}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleAddressChange(val)}
        />
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleWebsiteChange(val)}
        />
        <TouchableOpacity 
          style={styles.createCompany}
          disabled={data.disabled}
          onPress={newCompany}
        >
            <Text 
              style={styles.button}
            >
              { data.disabled !== true ? "Create" : "Creating..."}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancel}
          onPress={() => navigation.goBack()}
        >
            <Text 
              style={[ styles.button, {color: 'black'} ]}
            >Cancel</Text>
        </TouchableOpacity>
    </Animatable.View>
  );
};

export default NewCompanyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  title: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      paddingHorizontal: 30,
      marginTop: 60,
      marginBottom:30
  },
  label: {
    marginTop: 10,
    marginLeft:30,
    marginBottom:10,
  },
  textInput: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius:10,
    borderColor: 'gray',
    padding: 15,
    borderWidth: 1,
    marginLeft:30,
    marginRight:30,
  },
  createCompany: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fc049d',
    marginTop: 60,
    marginLeft: 30,
    width: 350,
  },
  cancel: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 30,
    width: 350,
  },
  button: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }

});

