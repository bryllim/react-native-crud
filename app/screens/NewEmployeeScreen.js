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
import DropDown from "react-native-paper-dropdown";
import { Card } from 'react-native-paper';

const NewEmployeeScreen = ({navigation}) => {

  const [companyData, setCompanyData] = React.useState({
    companies: []
  });

  const getCompanyList = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:80/reactbackend/companydropdown.php'
      );
      let json = await response.json();
      setCompanyData({
        companies: json
      })
      console.log(companyData.companies);
    } catch (error) {
      alert(error);
    }
  };

  const unsubscribe = navigation.addListener('focus', () => {
    getCompanyList();
  });

  React.useEffect(() => {
    getCompanyList();
    return () => {
      unsubscribe;
    }
  }, []);  

  const [showDropDown, setShowDropDown] = React.useState(false);

  const [data, setData] = React.useState({
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    disabled: false,
  });

  const newEmployee = () => {
    if(data.firstname.length == 0 || data.lastname.length == 0 || data.company.length == 0 || data.email.length == 0){

      Alert.alert('Wrong input!', 'Please fill in all fields.', [
        {text: 'Okay'}
      ]);

    }else{

      setData({
        ...data,
        disabled: true
      });

      const employeeData = {
        firstname: data.firstname,
        lastname: data.lastname,
        company: data.company,
        email: data.email,
      }

      const newEmployeeAPI = "http://10.0.2.2:80/reactbackend/newemployee.php";

      const headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
      };

      async function createNewEmployee() {
        try{
          const response = await fetch(newEmployeeAPI, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(employeeData),
          });
          const result = await response.json();
          Alert.alert('Employee added', result[0].Message, [
            {text: 'Okay', onPress: () => navigation.navigate('EmployeeScreen')}
          ]);
        } catch (error) {
          alert("Error: " + error);
          setData({
            ...data,
            disabled: false
          });
        }
      }
      createNewEmployee();

    }
  }

  const handleFirstNameChange = (val) => {
    setData({
      ...data,
      firstname: val,
    })
  }

  const handleLastNameChange = (val) => {
    setData({
      ...data,
      lastname: val,
    })
  }

  const handleCompanyChange = (val) => {
    setData({
      ...data,
      company: val,
    })
  }

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    })
  }

  return (
    <Animatable.View style={styles.container} animation="fadeInLeftBig">
        <StatusBar backgroundColor='black' barStyle="light-content"/>
        <Text style={styles.title}>New Employee</Text>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleFirstNameChange(val)}
        />
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleLastNameChange(val)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleEmailChange(val)}
        />
        <Text style={styles.label}>Company</Text>
        <Card style={styles.dropdown}>
          <DropDown
            mode={"outlined"}
            placeholder={"Select a company"}
            value={data.company}
            setValue={(val) => handleCompanyChange(val)}
            list={companyData.companies}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
          />
        </Card>
        <TouchableOpacity 
          style={styles.createCompany}
          disabled={data.disabled}
          onPress={newEmployee}
        >
            <Text 
              style={styles.button}
            >
              { data.disabled !== true ? "Add" : "Adding..."}
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

export default NewEmployeeScreen;

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
  dropdown: {
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

