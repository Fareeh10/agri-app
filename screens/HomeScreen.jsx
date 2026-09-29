import { StyleSheet, Text, View, TouchableOpacity, Pressable, ScrollView ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/HomeHeader';

export default function HomeScreen({ navigation }) {
  return (
    
    <SafeAreaView style={styles.container}>
      <HomeHeader/>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        

        <Text style={styles.title}>Library</Text>
        <View style={styles.library}>
          <TouchableOpacity
            style={[styles.library_element]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Crops')}
          >
            <Image source={require('../assets/wheat-plant.png')} style={styles.library_element_image} />
            <Text style={styles.library_element_text}>Crops</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.library_element]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Animals')}
          >
            <Image source={require('../assets/poultry.png')} style={styles.library_element_image} />
            <Text style={styles.library_element_text}>Animals</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.library_element, { width: '98%', aspectRatio: 3, flexDirection: 'row' }]} activeOpacity={0.7}>
            <Image source={require('../assets/cultivation.png')} style={styles.library_element_image} />
            <Text style={styles.library_element_text}>Cultivation Tips</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={styles.title}>Tools</Text>
        <View style={styles.library}>
          
          <TouchableOpacity style={[styles.tool_element]} activeOpacity={0.7}>
            <Image source={require('../assets/ai-image.png')} style={styles.tool_image} />
            <Text style={styles.tool_element_text}>Plant Diagnosis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tool_element]} activeOpacity={0.7}>
            <Image source={require('../assets/fertilizer.png')} style={styles.tool_image} />
            <Text style={styles.tool_element_text}>Fertilizer Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tool_element]} activeOpacity={0.7}>
            <Image source={require('../assets/pesticide.png')} style={styles.tool_image} />
            <Text style={styles.tool_element_text}>Pesticide Calculator</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  // backgroundColor: '#fff',

},
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    width: '100%',
    paddingLeft: 32,
    paddingTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  library: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 10,
  },
  library_element: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '46.1%',
    height: '46.1%',
    padding: 15,
    aspectRatio: 1,
    borderRadius: 17,
  },
  library_element_text: {
    fontWeight: 'bold',
  },
  library_element_pressed: {
    backgroundColor: '#1ac12b38',
  },
  // tool_element: {
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   gap: 10,
  //   width: '29.5%',
  //   padding: 10,
  //   aspectRatio: 1,
  //   borderRadius: 17,
  // },
  tool_element: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 18,
    width: '100%',
    height: 77,
    paddingHorizontal: 20,
    borderRadius: 17,
  },
  tool_element_text: {
    textAlign: 'center',
    fontWeight : '500'
  },
  tool_element_pressed: {
    backgroundColor: '#1ac12b38',
  },
  tool_image : {
    // width : 32,
    // height : 32,
    width : 42,
    height : 42
  },
  library_element_image: {
    width: 52,
    height: 52,
  },
});

