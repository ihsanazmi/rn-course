import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoal, setCourseGoal ] = useState([]);
  const [addMod, setAddMod] = useState(false)

  const addGoalHandler = (goalTitle)=>{
    setCourseGoal(currentGoals => [
      ...courseGoal, 
       {id: Math.random().toString(), value: goalTitle}
      ])
    setAddMod(false)
  }

  const removeItem = (goalId)=>{
    setCourseGoal(currentGoals =>{
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }

  return (
    <View style={styles.screen}>
      <Button onPress={()=>setAddMod(true)} title='Add New Goal'/>
      <GoalInput visible={addMod} onAddGoal = {addGoalHandler} onCancel={()=>setAddMod(false)} />
      <FlatList  
        data={courseGoal}
        renderItem={ itemData => 
          <GoalItem 
            id={itemData.item.id} 
            onDelete={removeItem} 
            title={itemData.item.value} 
          /> 
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding:50
  },
});
