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

const EditCompanyScreen = ({ route, navigation }) => {

  const companyToUpdate = route.params.companyToUpdate;

  const [data, setData] = React.useState({
    name: companyToUpdate.name,
    address: companyToUpdate.address,
    website: companyToUpdate.website,
    disabled: false,
    deleteDisabled: false,
  });

  const deleteCompany = () => {
    Alert.alert('Delete', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'Delete', onPress: () => {

        setData({
          ...data,
          deleteDisabled: true
        });

        const companyData = {
          id: companyToUpdate.id
        }

        const deleteCompanyAPI = "http://10.0.2.2:80/reactbackend/deletecompany.php";

        const headers={
          'Accept':'application/json',
          'Content-Type':'application.json'
        };
  
        async function fetchDeleteCompany() {
          try{
            const response = await fetch(deleteCompanyAPI, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(companyData),
            });
            const result = await response.json();
            Alert.alert('Delete', result[0].Message, [
              {text: 'Okay', onPress: () => navigation.navigate('CompanyScreen')}
            ]);
          } catch (error) {
            alert("Error: " + error);
            setData({
              ...data,
              deleteDisabled: false
            });
          }
        }

        fetchDeleteCompany();

      }}
    ]);
  }

  const updateCompany = () => {
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
        id: companyToUpdate.id,
        name: data.name,
        address: data.address,
        website: data.website,
      }

      const updateCompanyAPI = "http://10.0.2.2:80/reactbackend/updatecompany.php";

      const headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
      };

      async function fetchUpdateCompany() {
        try{
          const response = await fetch(updateCompanyAPI, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(companyData),
          });
          const result = await response.json();
          Alert.alert('Update', result[0].Message, [
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

      fetchUpdateCompany();

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
        <Text style={styles.title}>Update Company</Text>
        <Text style={styles.label}>Company name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleNameChange(val)}
          defaultValue={companyToUpdate.name}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleAddressChange(val)}
          defaultValue={companyToUpdate.address}
        />
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => handleWebsiteChange(val)}
          defaultValue={companyToUpdate.website}
        />
        <TouchableOpacity 
          style={styles.createCompany}
          disabled={data.disabled}
          onPress={updateCompany}
        >
            <Text 
              style={styles.button}
            >
              { data.disabled !== true ? "Update" : "Updating..."}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          disabled={data.deleteDisabled}
          onPress={deleteCompany}
        >
            <Text 
              style={styles.button}
            >
              { data.deleteDisabled !== true ? "Delete" : "Deleting..."}
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

export default EditCompanyScreen;

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
  delete: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
    width: 350,
    backgroundColor: "red"
  },
  button: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }

});

