import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Chatheadder from '../ChtaUsers/ChatHeader/ChatHeaderRoot';
import Chatprofiles from '../ChtaUsers/ChatProfiles/Profile';
import privateAPI from '../../../api/privateAPI';

export default function ChatuserRoot() {

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const res = await privateAPI.post('/chat/getAllUser', {});
        setItems(res.data)
      } catch (error) {
        console.error(error)
      }

    }
    fetchUsers()
  }, [])
  const [items, setItems] = useState([]);
  // const [items, setItems] = useState([
  //   { id: 1, name: 'Raj' , Profession:"Actor" , Message:"prev message..." , Time:"today"},
  //   { id: 2, name: 'Ram', Profession:"Actor" , Message:"prev message...", Time:"today"},
  //   { id: 3, name: 'Nagesh', Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 4, name: 'Shreya', Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 5, name:"Bala", Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 6, name:"Trisha", Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 7, name:"Karthi", Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 8, name:" Mani", Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 9, name:"Vijay", Profession:"Actor", Message:"prev message...", Time:"today"},
  //   { id: 10, name:"Surya", Profession:"Actor", Message:"prev message...", Time:"today"}
  // ]);

  const [search, setSearch] = useState("");


  return (
    <>
      <View>

        <Chatheadder
          search={search}
          setSearch={setSearch}
          items={items}
        />

        <Chatprofiles
          items={items}
          setItems={setItems}
          search={search}
        />

      </View>
    </>
  )
}
// {items.filter((item) => ((item.username).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))