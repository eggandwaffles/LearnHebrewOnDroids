var wordDataGlobal = []
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeWordData = async (data) => {
    try {
        const stringified = JSON.stringify(data)
        await AsyncStorage.setItem('wordData', stringified)
        console.log("WordData updated")
      } catch(e) {
        // read error
      }
  }


const loadWordData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('wordData')
      console.log("Loaded wordData. First 100 chars are: " + jsonValue.substring(0,100) + " Timestamp: " + Date.now())
      return JSON.parse(jsonValue)
    } catch(e) {
      // read error
    }
}
function setWordDataGlobal (newData) {
    wordDataGlobal = newData
    console.log("GlobalWordData updated!")
}
function getWordDataGlobal () {
    console.log("Got GlobalWordData! Length is " + wordDataGlobal.length + ". Timestamp: " + Date.now())
    return wordDataGlobal
}
async function refreshWordDataGlobal () {
    if (wordDataGlobal.length) {
        return 'No updates required'
    } else {
        console.log("attempting wordData collection...")
       wordDataGlobal = await loadWordData()
        if (wordDataGlobal) {
            console.log('Global data updated with ' + wordDataGlobal.length + ' items.')
        }
    }
}

function categoricalInjection (name, wordIds) {
    //A function that adds a category to a array of words (listed by ID).
    var mutableWordData = getWordDataGlobal()
    for (let i = 0; i<mutableWordData.length;i++) {
        if (wordIds.includes(mutableWordData[i].id)) {
            mutableWordData[i].categories.push(name)
        }
    }
    //Now that mutableWordData has been updated, overwrite the existing wordData with it.
    setWordDataGlobal(mutableWordData)
    storeWordData(mutableWordData)
    //This will be deleted when the app's local data is cleared.
    console.log(`Added category: ${name}`)
}

module.exports = { setWordDataGlobal, getWordDataGlobal, refreshWordDataGlobal, categoricalInjection }