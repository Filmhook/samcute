import React,{useState} from 'react'
import {  View } from 'react-native'
import Chatheadder from '../ChtaUsers/ChatHeader/ChatHeaderRoot';
import Chatprofiles from '../ChtaUsers/ChatProfiles/Profile';

export default function ChatuserRoot() {
  
  const [items, setItems] = useState([
    { id: 1, name: 'Raj' , Profession:"Actor" , Message:"prev message..." , Time:"today"},
    { id: 2, name: 'Ram', Profession:"Actor" , Message:"prev message...", Time:"today"},
    { id: 3, name: 'Nagesh', Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 4, name: 'Shreya', Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 5, name:"Bala", Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 6, name:"Trisha", Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 7, name:"Karthi", Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 8, name:" Mani", Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 9, name:"Vijay", Profession:"Actor", Message:"prev message...", Time:"today"},
    { id: 10, name:"Surya", Profession:"Actor", Message:"prev message...", Time:"today"}
  ]);
  
  const [search,setSearch]= useState("");


  return (
    <>
    <View>

      <Chatheadder  
      search={search}
      setSearch={setSearch}
      items={items}
      />
      
      <Chatprofiles 
            items = {items.filter((item) => ((item.name).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
            setItems={setItems}
            search={search}
      /> 
     
    </View>
    </>
  )
}